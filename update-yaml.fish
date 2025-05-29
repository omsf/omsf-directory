for f in software/*.yaml
    yq -i e '.languages |= ["Python"]' $f
end
for f in workflows/*.yaml
    yq -i e '.languages |= ["Python"]' $f
end
