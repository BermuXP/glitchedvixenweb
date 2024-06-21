document.querySelector('.left-banner').addEventListener('mouseover', function () {
  this.querySelector('img').src = './public/img/yandere.png';
  this.querySelector('span').color = 'red';
});
document.querySelector('.left-banner').addEventListener('mouseout', function () {
  this.querySelector('img').src = './public/img/hot_vixens_in_your_area.png';
});
document.querySelector('.right-banner').addEventListener('mouseover', function () {
  this.querySelector('img').src = './public/img/yandere.png';
});
document.querySelector('.right-banner').addEventListener('mouseout', function () {
  this.querySelector('img').src = './public/img/hot_vixens_in_your_area.png';
});