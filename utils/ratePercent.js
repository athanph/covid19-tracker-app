export default function ratePercent(a, b) {
	return Math.round(((a / b) * 100).toFixed(2))
}