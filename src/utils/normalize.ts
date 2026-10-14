/** Bỏ dấu tiếng Việt, đổi đ→d, chữ thường, gọn khoảng trắng: "TP. Đà Nẵng" → "tp da nang" */
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}
