
let WidthWindow = 1920 + 310;
const clouds = document.querySelectorAll(".cloud");
let cloudLeft = null;
let newCloudLeft = null;
let presenceAnimation = false;

function flyingСlouds() {
	if (presenceAnimation = !presenceAnimation) {
		for (let cloud of clouds) {
			cloudLeft = Math.round(cloud.getBoundingClientRect().left);
			if (WidthWindow > cloudLeft) {
				newCloudLeft = cloudLeft + 1;
				cloud.style.transform = `translate(${newCloudLeft}px)`;
			} else {
				cloud.style.transform = `translate(-340px)`; 
			}
		}
	}
	requestAnimationFrame(flyingСlouds);
}

flyingСlouds()