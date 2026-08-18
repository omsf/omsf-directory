#!/usr/bin/env python3
"""Validate an OMSF Directory entry using only the Python standard library."""

from __future__ import annotations

import argparse
import ast
import re
import sys
from pathlib import Path
from urllib.parse import urlsplit

REQUIRED = {"name", "description", "repository", "licenses", "languages", "tags"}
OPTIONAL = {"docs", "link", "project"}
LIST_FIELDS = {"licenses", "languages", "tags"}
PROJECTS = {
    "Open Force Field",
    "OpenADMET",
    "Open Free Energy",
    "OpenFold",
    "WESTPA",
    "OMSF",
}
FILENAME = re.compile(r"[a-z0-9]+(?:[-_][a-z0-9]+)*\.ya?ml")
SPDX_ID = re.compile(r"[A-Za-z0-9][A-Za-z0-9.-]*")


class InvalidEntry(ValueError):
    pass


def parse_scalar(value: str, line: int) -> str:
    value = value.strip()
    if not value:
        raise InvalidEntry(f"line {line}: expected a value")
    if value.startswith("'"):
        if not value.endswith("'"):
            raise InvalidEntry(f"line {line}: invalid quoted string")
        return value[1:-1].replace("''", "'")
    if value.startswith('"'):
        try:
            value = ast.literal_eval(value)
        except (SyntaxError, ValueError) as error:
            raise InvalidEntry(f"line {line}: invalid quoted string") from error
    if not isinstance(value, str):
        raise InvalidEntry(f"line {line}: expected a string")
    return value


def parse_list(value: str, line: int) -> list[str]:
    if not value.startswith("[") or not value.rstrip().endswith("]"):
        raise InvalidEntry(f"line {line}: invalid inline list")

    parts: list[str] = []
    start = 1
    quote = ""
    index = 1
    while index < len(value) - 1:
        character = value[index]
        if quote:
            if character == "\\" and quote == '"':
                index += 2
                continue
            if character == quote:
                if quote == "'" and value[index + 1 : index + 2] == "'":
                    index += 2
                    continue
                quote = ""
        elif character in {'"', "'"}:
            quote = character
        elif character == ",":
            parts.append(value[start:index])
            start = index + 1
        elif character in "[]{}":
            raise InvalidEntry(f"line {line}: nested inline values are not supported")
        index += 1

    if quote:
        raise InvalidEntry(f"line {line}: invalid inline list")
    parts.append(value[start:-1])
    if len(parts) == 1 and not parts[0].strip():
        return []
    return [parse_scalar(item, line) for item in parts]


def parse_entry(text: str) -> dict[str, str | list[str]]:
    """Parse the simple mapping-and-string-list YAML used by the catalogue."""
    lines = text.splitlines()
    entry: dict[str, str | list[str]] = {}
    index = 0

    while index < len(lines):
        raw = lines[index]
        line_number = index + 1
        index += 1
        if not raw.strip() or raw.lstrip().startswith("#") or raw.strip() == "---":
            continue
        if raw.startswith((" ", "\t")):
            raise InvalidEntry(f"line {line_number}: unexpected indentation")

        match = re.fullmatch(r"([A-Za-z][A-Za-z0-9_-]*):(?:\s*(.*))?", raw)
        if not match:
            raise InvalidEntry(f"line {line_number}: expected 'field: value'")
        key, value = match.groups()
        if key in entry:
            raise InvalidEntry(f"line {line_number}: duplicate field {key!r}")

        value = value or ""
        if value.startswith("["):
            while not value.rstrip().endswith("]") and index < len(lines):
                value += " " + lines[index].strip()
                index += 1
            entry[key] = parse_list(value, line_number)
            continue
        if value:
            entry[key] = parse_scalar(value, line_number)
            continue

        items: list[str] = []
        while index < len(lines) and lines[index].startswith("  - "):
            items.append(parse_scalar(lines[index][4:], index + 1))
            index += 1
        if items:
            entry[key] = items
            continue
        if index < len(lines) and lines[index].startswith("  ["):
            entry[key] = parse_list(lines[index].strip(), index + 1)
            index += 1
            continue
        raise InvalidEntry(f"line {line_number}: expected a value or list")

    return entry


def validate_url(field: str, value: str) -> None:
    parsed = urlsplit(value)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise InvalidEntry(f"{field}: expected an http:// or https:// URL")


def validate(path: Path) -> None:
    if not FILENAME.fullmatch(path.name):
        raise InvalidEntry(
            "filename must be lowercase with hyphen or underscore separators, ending in .yaml or .yml"
        )

    entry = parse_entry(path.read_text(encoding="utf-8"))
    fields = set(entry)
    if missing := REQUIRED - fields:
        raise InvalidEntry(f"missing required field(s): {', '.join(sorted(missing))}")
    if unknown := fields - REQUIRED - OPTIONAL:
        raise InvalidEntry(f"unknown field(s): {', '.join(sorted(unknown))}")

    for field, value in entry.items():
        if field in LIST_FIELDS:
            if not isinstance(value, list) or not value or any(not item.strip() for item in value):
                raise InvalidEntry(f"{field}: expected a non-empty list of strings")
        elif not isinstance(value, str) or not value.strip():
            raise InvalidEntry(f"{field}: expected a non-empty string")

    for field in ("repository", "docs", "link"):
        if field in entry:
            validate_url(field, entry[field])  # type: ignore[arg-type]

    project = entry.get("project")
    if project is not None and project not in PROJECTS:
        raise InvalidEntry(f"project: expected one of {', '.join(sorted(PROJECTS))}")

    for license_id in entry["licenses"]:
        if not SPDX_ID.fullmatch(license_id) and not license_id.startswith("LicenseRef-"):
            raise InvalidEntry(f"licenses: {license_id!r} is not an SPDX identifier")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("entries", nargs="+", type=Path)
    args = parser.parse_args()
    failed = False
    for path in args.entries:
        try:
            validate(path)
        except (InvalidEntry, OSError) as error:
            failed = True
            print(f"{path}: {error}", file=sys.stderr)
        else:
            print(f"{path}: valid")
    return int(failed)


if __name__ == "__main__":
    raise SystemExit(main())
