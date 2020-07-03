const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');
const sky = document.querySelector('.sky');
const btn = document.querySelector('.toggle-animation');
const btnReset = document.querySelector('.reset-animation');

const animation = (elem, posOnCircle = 0, speed) => {
	const radius = 265; // радиус окружности 
    const s = speed * Math.PI / 180;
    let f = posOnCircle * s;
    let moonDeg = 0;
    let id;
    let isOn = false;

    const move = () => {
        f += s;
		elem.style.left = 280 + radius * Math.sin(f)  + 'px';
        elem.style.top = 280 + radius * Math.cos(f) + 'px';

        if (elem === sun) {
            if (parseInt(elem.style.top) > 250) {
                sky.style.backgroundColor = '#243447';
            } else {
                sky.style.backgroundColor = '#add8e6';
            }
        }

        if (elem === moon) {
            elem.style.transform = `rotate(${moonDeg}deg)`;
            moonDeg++;
        }

        id = requestAnimationFrame(move);
    };

    const btnHandler = () => {
        if (!isOn) {
            move();
            isOn = true;
            btn.textContent = 'Stop animation';
        } else {
            cancelAnimationFrame(id);
            isOn = false;
            btn.textContent = 'Resume animation';
        }
    };

    const resetBtnHandler = () => {
        btn.textContent = 'Start animation';
        if (isOn) cancelAnimationFrame(id);
        elem.style.top = '50%';
        elem.style.left = 0;
        btn.removeEventListener('click', btnHandler);
        btnReset.removeEventListener('click', resetBtnHandler);
        animation(elem, posOnCircle, speed);
    }

    btn.addEventListener('click', btnHandler);

    btnReset.addEventListener('click', resetBtnHandler);
};  

animation(sun, 67, 1);
animation(moon, -110, 1);
