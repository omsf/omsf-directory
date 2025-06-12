import { expect, test } from 'vitest'
import { filterToggle, isMobileWidth } from '../../../lib/utils/filterUtils'

test('filterToggle removes a tag', () => {
	const list = ['tag1', 'tag2', 'tag3']
	filterToggle('tag1', list)
	expect(list).toEqual(['tag2', 'tag3'])
})

test('filterToggle adds a tag', () => {
	const list = ['tag1', 'tag2', 'tag3']
	filterToggle('tag4', list)
	expect(list).toEqual(['tag1', 'tag2', 'tag3', 'tag4'])
})

test('isMobileWidth returns true', () => {
	const result = isMobileWidth(700)
	expect(result).toEqual(true)
})

test('isMobileWidth returns false', () => {
	const result = isMobileWidth(1080)
	expect(result).toEqual(false)
})
