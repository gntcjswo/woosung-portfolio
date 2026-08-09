/**
 * @typedef {Object} ProjectLink
 * @property {string} label
 * @property {string} url
 * @property {string} [altText] - 링크가 작동하지 않을 때 표시할 대체 텍스트 (예: "호스팅 만료")
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} name
 * @property {string|string[]} thumbnail
 * @property {string[]} [thumbnails]
 * @property {ProjectLink[]} links
 * @property {string[]} tags
 * @property {string} [period]
 * @property {string[]} techStack
 * @property {string[]} roles
 * @property {string[]} achievements
 * @property {string} [description]
 * @property {boolean} [visible] - 표출 여부 제어 (기본값: true)
 */

// 타입만 정의하고 실제 내보낼 것은 없음
export {};