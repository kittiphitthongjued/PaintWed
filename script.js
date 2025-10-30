document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('calcForm');
	const sexEl = document.getElementById('sex');
	const heightEl = document.getElementById('height');
	const weightEl = document.getElementById('weight');
	const resultEl = document.getElementById('result');

	function calcIdealWeight(sex, heightCm) {
		// สูตร Broca ที่ปรับ: ชายใช้ 10% หญิงใช้ 15%
		const base = heightCm - 100;
		if (sex === 'male') {
			return +(base - base * 0.10).toFixed(1);
		} else {
			return +(base - base * 0.15).toFixed(1);
		}
	}

	function getComparison(current, ideal) {
		if (current == null || Number.isNaN(current)) return null;
		const diff = +(current - ideal).toFixed(1);
		if (Math.abs(diff) < 0.5) return { msg: `น้ำหนักใกล้เคียงกับน้ำหนักมาตรฐาน (ต่าง ${diff} กก.)`, status: 'normal' };
		if (diff < 0) return { msg: `น้ำหนักน้อยกว่ามาตรฐาน ${Math.abs(diff)} กก.`, status: 'under' };
		return { msg: `น้ำหนักมากกว่ามาตรฐาน ${diff} กก.`, status: 'over' };
	}

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const sex = sexEl.value;
		const height = parseFloat(heightEl.value);
		const weight = weightEl.value ? parseFloat(weightEl.value) : null;

		if (!height || height <= 0) {
			resultEl.innerHTML = '<p>กรุณาใส่ส่วนสูงที่ถูกต้อง (ซม.)</p>';
			return;
		}

		const ideal = calcIdealWeight(sex, height);
		const cmp = getComparison(weight, ideal);

		let html = `<p>เพศ: ${sex === 'male' ? 'ชาย' : 'หญิง'}</p>`;
		html += `<p>ส่วนสูง: ${height} ซม.</p>`;
		html += `<p>น้ำหนักมาตรฐานโดยประมาณ: <strong>${ideal} กก.</strong></p>`;

		if (cmp) {
			html += `<p>น้ำหนักจริง: ${weight} กก. — ${cmp.msg}</p>`;
		} else {
			html += `<p>ระบุ "น้ำหนักจริง" เพื่อเปรียบเทียบ</p>`;
		}

		resultEl.innerHTML = html;
	});
});
