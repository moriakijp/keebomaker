const drawPie = (ctx, cx, cy, r, startAngle, endAngle, color, label) => {
  const x0 = r * Math.cos(startAngle)
  const y0 = r * Math.sin(startAngle)
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(cx, cy)
  ctx.lineTo(cx + x0, cy + y0)
  ctx.arc(cx, cy, r, startAngle, endAngle)
  ctx.closePath()
  ctx.fill()

  const labelMargin = 10
  const labelAngle = (startAngle + endAngle) / 2
  const tx = (r + labelMargin) * Math.cos(labelAngle) + cx
  const ty = (r + labelMargin) * Math.sin(labelAngle) + cy
  if (Math.cos(labelAngle) < 0) {
    ctx.textAlign = 'right'
  } else {
    ctx.textAlign = 'left'
  }
  ctx.fillStyle = 'black'
  ctx.font = '24px serif'
  ctx.fillText(label, tx, ty)
}

const dChart = (canvas, data) => {
  const maleCount = data.filter((item) => item.gender == 'male').length
  const width = canvas.width
  const height = canvas.height
  const r = 150
  const ctx = canvas.getContext('2d')
  drawPie(ctx, width / 2, height / 2, r, 0, 2 * Math.PI * maleCount / data.length, 'blue', 'male')
  drawPie(ctx, width / 2, height / 2, r, 2 * Math.PI * maleCount / data.length, 2 * Math.PI, 'red', 'female')
}

document.querySelector('#message-button').addEventListener('click', () => {
  fetch('nobel_winners_cleaned.json')
    .then((response) => response.json())
    .then((data) => {
      const canvas = document.querySelector('#chart')
      drawChart(canvas, data)
    })
})