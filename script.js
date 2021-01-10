let RaName = ['Filip','Pit','Dolores','William','Boris','Mary','Tomas','Lary'];//randoM Name
let RaFam =  ['Toti','Dosy','Dores','Varmi','Glazgo','Miller','Sinossu', 'Roll', 'Enderson', 'Walker', ''];//randoM Famile Name
let RaWork = ['Военный','Юрист','Охраник','Директор','Циркач','Министр','Бомж'];//randoM worked

function menuShow(){document.querySelector('#menu').style.left = 0}
function menuHide(){document.querySelector('#menu').style.left = '-260px'}
// let feature = [
// 	bluBlood = `<img class="feature" id="feature1_leader_socialist1" src="https://cdn.streamelements.com/uploads/40c4495d-37f9-46dc-9598-8e977f20982b.jpg"></img>`,
// 	popular = `<img class="feature" id="feature1_leader_socialist1" src="https://clipart-best.com/img/star/star-clip-art-2.png"></img>`,
// 	stupid = `<img class="feature" id="feature1_leader_socialist1" src="https://caricatura.ru/gf-img/1058091/img-0.__GF_800x.jpeg"></img>`,
// 	angry = `<img class="feature" id="feature1_leader_socialist1" src="https://i.pinimg.com/originals/58/05/87/5805877a4838014815f6217b53fba568.jpg"></img>`,
// 	lazy = `<img class="feature" id="feature1_leader_socialist1" src="https://www.clearviewip.com/app/uploads/2016/11/Sloth.jpg"></img>`,
// ];

function obj(color, politica, pop, par){return {
	color,
	politica, 
	name: localStorage.getItem(`namLead_${politica}`), 
	fName: localStorage.getItem(`fNamLead_${politica}`), 
	work: localStorage.getItem(`workLead_${politica}`), 
	pop, 
	par
}}

let pol = [
	mon = obj("#6201FD", "monarchist",  800, 800), 
	lib = obj("#BE9719", "liberal",     230, 90), 
	dem = obj("#23ABFA", "democratic",  169, 150), 
	nat = obj("#0004FF", "nationalist", 1000, 410), 
	grn = obj("#24D613", "green",       200, 10), 
	soc = obj("#DD1111", "socialist",   400, 10)
]

const mains = document.querySelector('#mains')
const budget = document.querySelector('#budget')
const pi = Math.PI

let openPar = true
let save
let save1
let save2
randoM = (max) => Math.floor(Math.random() * max)
function sortPar(){
	for(i = 0; i < pol.length -1; i++){
		if(pol[i].par < pol[i+1].par){
			save = pol[i]
			pol[i] = pol[i+1]
			pol[i+1] = save
			sortPar()
		}
	}
}
function sortPop(){
	for(i = 0; i < pol.length -1; i++){
		if(pol[i].pop < pol[i+1].pop){
			save = pol[i]
			pol[i] = pol[i+1]
			pol[i+1] = save
			sortPop()
		}
	}
}

function circle(ctx, crdnt){
	for(i = 0; i < pol.length; i++){
		ctx.beginPath()
		ctx.strokeStyle = pol[i].color
		ctx.fillStyle = pol[i].color
		ctx.moveTo(100, 100)
		ctx.arc(100, 100, 95, crdnt[i], crdnt[i+1], true)
		ctx.lineTo(100, 100)
		ctx.fill()
	}
}
function newPar(){
	sortPar()
	for(let i = 0; i < pol.length; i++) pol[i].par = pol[i].pop / (i+1)
	sortPar()
}


function canPar(){
	document.querySelector('#parlament').innerHTML += `<canvas  class="canvas" id="canvas_parlament" width='400px' height='200px'></canvas>`;
	const canPa = document.querySelector('#canvas_parlament');
	const ctxPa = canPa.getContext('2d');

	let sumPar = 0
	for(let i = 0; i < pol.length; i++) sumPar += pol[i].par

	const crdntPar = [0,0,0,0,0,0,0,0]

	for(let i = 1; i < 6; i++){
		let summ = 0
		for(let k = 0; k < i; k++)summ += pol[k].par
		crdntPar[i] = 2*pi*( 1-(summ / sumPar))
	}
	circle(ctxPa, crdntPar)
	return crdntPar[1]
}
function canPop(){
	document.querySelector('#popularity').innerHTML += `<canvas class="canvas" id="canvas_popularity" width='400px' height='200px'></canvas>`
	const canPo = document.querySelector('#canvas_popularity')
	const ctxPo = canPo.getContext('2d')

	sumPop = pol[0].pop + pol[1].pop + pol[2].pop + pol[3].pop + pol[4].pop + pol[5].pop

	const crdntPop = [0,0,0,0,0,0,0,0]

	for(i = 1; i < 6; i++){
		let summ = 0
		for(k = 0; k < i; k++)summ += pol[k].pop
		crdntPop[i] = 2*pi*( 1-(summ / sumPop))
	}
	circle(ctxPo, crdntPop)
}

function NewHum(){
	name = RaName[randoM(RaName.length)];
	fam  = RaFam[randoM(RaFam.length)];
	work = RaWork[randoM(RaWork.length)];
}

document.querySelector('#oo').onclick = () => minsN1();
document.querySelector('#os').onclick = () => minsN1();
document.querySelector('#ot').onclick = () => minsN1();


document.querySelector('#mains_botton').onclick = () =>{
	menuHide();
	budget.innerHTML = ''
	mains.innerHTML = ''
	mains.insertAdjacentHTML('beforeend', `
		<header class="font" id="State_policy">Абсолютная монархия</header>
		<div class="font" id="president">Король</div>
		<div class="font" id="premier">Премьер</div>
		<div class="font" id="parlament">Парламент</div>
		<div class="font" id="popularity">Популярность</div>
		<div class="font" id="partys">Партии</div>
	`)
	const partys = document.querySelector('#partys')
	for(i = 0; i < 7; i++)partys.innerHTML += `<div class="party party${i}"></div>`
	sortPop()
	canPop()

	sortPar()
	canPar()

	openPar = false
	plusMain = 1;
	plusOpposition = 1



	// document.querySelector('#features_leader_monarchist').innerHTML += `<img class="feature " id="feature1_leader_monarchist1" src="https://cdn.streamelements.com/uploads/40c4495d-37f9-46dc-9598-8e977f20982b.jpg"></img>`;
	// document.querySelector('#features_leader_monarchist').innerHTML += `<img class="feature " id="feature1_leader_monarchist2" src="https://cdn.streamelements.com/uploads/40c4495d-37f9-46dc-9598-8e977f20982b.jpg"></img>`;
	// document.querySelector('#features_leader_monarchist').innerHTML += `<img class="feature " id="feature1_leader_monarchist3" src="https://cdn.streamelements.com/uploads/40c4495d-37f9-46dc-9598-8e977f20982b.jpg"></img>`;

	// document.querySelector('#features_leader_liberal').innerHTML += `<img class="feature " id="feature1_leader_liberal1" src="https://cdn.streamelements.com/uploads/40c4495d-37f9-46dc-9598-8e977f20982b.jpg"></img>`;
			
	// document.querySelector('#features_leader_democratic').innerHTML += `<img class="feature " id="feature1_leader_democraticl" src="https://cdn.streamelements.com/uploads/40c4495d-37f9-46dc-9598-8e977f20982b.jpg"></img>`;

	// document.querySelector('#features_leader_nationalist').innerHTML += `<img class="feature " id="feature1_leader_nationalist1" src="https://cdn.streamelements.com/uploads/40c4495d-37f9-46dc-9598-8e977f20982b.jpg"></img>`;

	// document.querySelector('#features_leader_green').innerHTML += `<img class="feature " id="feature1_leader_green1" src="https://cdn.streamelements.com/uploads/40c4495d-37f9-46dc-9598-8e977f20982b.jpg"></img>`;

	// document.querySelector('#features_leader_socialist').innerHTML += `<img class="feature " id="feature1_leader_socialist1" src="https://cdn.streamelements.com/uploads/40c4495d-37f9-46dc-9598-8e977f20982b.jpg"></img>`;
	//function keep(){localStorage.getItem()}

	for(i=0; i < pol.length; i++){
		if (pol[i].name === null||pol[i].name === "null"){
			NewHum()
			pol[i].name = name
		}
		else if (pol[i].fName === null||pol[i].fName === "null"){
			NewHum()
			pol[i].fName = fam
		}
		else if (pol[i].work === null||pol[i].work === "null"){
			NewHum()
			pol[i].work = work
		}
		else{
			pol[i].name = localStorage.getItem(`namLead_${pol[i].politica}`)
			pol[i].fName = localStorage.getItem(`fNamLead_${pol[i].politica}`)
			pol[i].work = localStorage.getItem(`workLead_${pol[i].politica}`)
		}
		document.querySelector(`.party${i+1}`).insertAdjacentHTML('beforeend',`
			<div class="name_party"  id="name_party_${pol[i].politica}styly" style="background-color:${pol[i].color}">${pol[i].politica}</div>
			<div class="photo"       id="photo_leader_${pol[i].politica}"></div>
			<span class="name"        id="name_leader_${pol[i].politica}">${pol[i].name}</span>
			<span class="family_name" id="family_name_leader_${pol[i].politica}">${pol[i].fName}</span>
			<div class="worked"      id="worked_leader_${pol[i].politica}">${pol[i].work}</div>
			<div class="features"    id="features_leader_${pol[i].politica}"></div>
		`)
		localStorage.setItem(`namLead_${pol[i].politica}`, pol[i].name)
		localStorage.setItem(`fNamLead_${pol[i].politica}`,	pol[i].fName)
		localStorage.setItem(`workLead_${pol[i].politica}`, pol[i].work)
	}

	const president = document.querySelector('#president');
	president.style.backgroundColor = pol[0].color
	president.insertAdjacentHTML('beforeend', `
		<div  class="photo" id="photo_president"></div>
		<span class="name" id="name_president">${pol[0].name}</span>
		<span class="family_name" id="family_name_president"> ${pol[0].fName}</span>
		<div  class="worked" id="worked_leader_president">${pol[0].work}</div>
		<div  class="features" id="features_leader_president"></div>
	`)

	const premier = document.querySelector('#premier');
	if(canPar()/pi > 1){
		premier.style.backgroundColor = pol[1].color;
		premier.insertAdjacentHTML('beforeend', `
			<div  class="photo"       id="photo_premier">               	   </div>
			<span class="name"        id="name_premier">         ${pol[1].name}</span>
			<span class="family_name" id="family_name_premier"> ${pol[1].fName}</span>
			<div  class="worked"      id="worked_leader_premier">${pol[1].work}</div>
			<div  class="features"    id="features_leader_premier">			   </div>
	`)}
	else{
		premier.insertAdjacentHTML('beforeend', `
			<div  class="photo" id="photo_premier"></div>
			<span class="name"id="name__premier">Запрещён</span>
			<span class="family_name"id="family_name_premier"></span>
	`)}
}


document.querySelector('#budget_botton').onclick = () =>{
	menuHide()
	mains.innerHTML = ''
	budget.innerHTML = ''
	budget.insertAdjacentHTML('beforeend',`
		<div class="tax font">Доход</div>
		<div class="tax" id="poor_tax"></div>
		<div class="tax" id="middle_tax"></div>
		<div class="tax" id="rich_tax"></div>
		<div class="tax" id="duties_tax"></div>
		<div class="spending font">Затраты</div>
		<div class="spending" id="education_spending"></div>
		<div class="spending" id="control_spending"></div>
		<div class="spending" id="social_spending"></div>
		<div class="spending" id="military_spending"></div>
		<span class="font" id="balance_text">Примерное сальдо:<span id="balance">0</span></span>
	`)

	document.querySelector('#poor_tax').insertAdjacentHTML('beforeend', `
		<span  class="font">Налог на бедных</span>
		<input class="percent" id="percent_poor_tax" type="range">
		<div   class="income"  id="income_poor_tax">50%</div>;
	`)
	const midTax = document.querySelector('#middle_tax');
	midTax.innerHTML += `<span  class="font">Налог на бедных</span>`;
	midTax.innerHTML += `<input class="percent" id="percent_rich_tax" type="range">`;
	midTax.innerHTML += `<div   class="income"  id="income_rich_tax">50%</div>`;
	const dutTax = document.querySelector('#duties_tax');
	dutTax.innerHTML += `<span  class="font">Пошлины</span>`;
	dutTax.innerHTML += `<input class="percent" id="percent_duties_tax" type="range">`;
	dutTax.innerHTML += `<div   class="income"  id="income_duties_tax">50%</div>`;
	const edSpend = document.querySelector('#education_spending');
	edSpend.innerHTML += `<span  class="font">Затраты на образование</span>`;
	edSpend.innerHTML += `<input class="percent" id="percent_education_spending" type="range">`
	edSpend.innerHTML += `<div   class="amount"  id="amount_education_spending">50%</div>`;
	const cntrlSpend = document.querySelector('#control_spending');
	cntrlSpend.innerHTML += `<span  class="font">Затраты на управление</span>`;
	cntrlSpend.innerHTML += `<input class="percent" id="percent_control_spending" type="range">`;
	cntrlSpend.innerHTML += `<div   class="amount"  id="amount_control_spending">50%</div>`;
	const socSpend = document.querySelector('#social_spending');
	socSpend.innerHTML += `<span  class="font">Затраты на социальную сферу</span>`;
	socSpend.innerHTML += `<input class="percent" id="percent_social_spending" type="range">`;
	socSpend.innerHTML += `<div   class="amount"  id="amount_social_spending">50%</div>`;
	document.querySelector('#military_spending').insertAdjacentHTML('beforeend', `
		<span  class="font">Затраты на оборону</span>
		<input class="percent" id="percent_military_spending" type="range">
		<div   class="amount"  id="amount_military_spending">50%</div>
	`)
}
checkResolutionSecond = (resolutionSecond) =>{return (resolutionSecond !== null) ? `<div class="resolution third" id="os">${resolutionSecond}</div>` : ``}
checkResolutionThird = (resolutionThird) =>{return (resolutionThird !== null) ? `<div class="resolution third" id="ot">${resolutionThird}</div>` : ``}

html = (Newspaper, src, strangeLorem, resolutionFirst, resolutionSecond = null, resolutionThird = null) =>{
	document.querySelector('#button_for_new_move').onclick = null;
	const newF = document.querySelector('#new_first')
	newF.innerHTML += `<div class="new first"></div>`
	newF.style.width = 700+'px'
	newF.style.height = 'auto'
	newF.style.backgroundColor = '#D5E29D'
	document.querySelector('.new.first').insertAdjacentHTML('beforeend',`
		<header class="header">${Newspaper}</header>
		<center><img class="img" src="${src}" alt=""></center>
		<div class="Lorem first">${strangeLorem}</div>
		<div class="resolution first" id="oo">${resolutionFirst}</div>
		${checkResolutionSecond(resolutionSecond)}
		${checkResolutionThird(resolutionThird)}
	`)
}
const gameEvents = [
	test = () =>{		
		html(
			'Центральный квартал',
			'https://cdn.maximonline.ru/36/f2/63/36f2637ef294455f33494ac1ee827aff/583x417_0xac120005_3457988091527733829.jpg', 
			`Политические действия принимают новую форму под которую нам нужно перестраиваться, если мы это конечно хотим...`, 
			'Поддержать правящую партию', 
			'Поддержать оппозиционную партию', 
			'Поддержать слабую партию'
		)
		RepetitionOfAnswers = (i, plus) =>{
			minsN1();
			sortPar();
			pol[i].pop *= Math.random() + plus;
			sortPop();
		}
		document.querySelector('#oo').onclick = () => RepetitionOfAnswers(0, 1)
		document.querySelector('#os').onclick = () => RepetitionOfAnswers(1, 1.2)
		document.querySelector('#ot').onclick = () => RepetitionOfAnswers(5, 0.7)
	},
	test2 = () =>{		
		html(
			'Центральный квартал',
			'https://cdn22.img.ria.ru/images/155775/02/1557750258_1:0:1000:562_600x0_80_0_0_9d1b638a93e7294df563e0f1f096a4c1.png', 
			`Время выборов! Настало время выяснить на кого же теперь возлагаются надежды и трудности правления страной?`, 
			'Провести выборы!', 
			'Оппозиция должна выиграть!', 
			'Пусть все останется как есть...'
		)
		RepetitionOfAnswers = (i, plus = null) =>{
			if(plus !== null) pol[i].par *= Math.random() + plus
			newPar()
			minsN1()
		}
		document.querySelector('#oo').onclick = () => RepetitionOfAnswers()
		document.querySelector('#os').onclick = () => RepetitionOfAnswers(1, 1)
		document.querySelector('#ot').onclick = () => RepetitionOfAnswers(2, 2)
	},
	test3 = () =>{		
		html(
			'Высшая гласность',
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT4f0GbYI-MnOY5H0yvErAdWdcUkOR7z3jmA&usqp=CAU', 
			`Сегодня стало известно о гибели нашего лидера 
			 <span bgcolor="${pol[0].color}">${pol[0].name}${pol[0].fName}</span> 
			 неизвестным террористом. Детективы расследуют это дело и подозревают в этом партию 
			 <span bgcolor="${pol[0].color}">${imposter.politica}</span> и их лидера 
			 <span bgcolor="${pol[0].color}">${imposter.name} ${imposter.fName}</span>. 
			 Будем надеятся что это не так.`, 
			'О боже!'
		)
		document.querySelector('#oo').onclick = () => {
			NewHum()
			pol[0].pop *= 1.1
			imposter.pop /= 4
			pol[0].name = name
			localStorage.setItem(`namLead_${pol[0].politica}`, name)
			if(pol[0].politica !== 'monarchist'){
				pol[0].fName = fam
				pol[0].work = work
				localStorage.setItem(`fNamLead_${pol[0].politica}`,	fam)
				localStorage.setItem(`workLead_${pol[0].politica}`, work)
			}
			minsN1()
		}
		document.querySelector('#button_for_new_move').onclick = null;
	},
]

minsN1 = () =>{
	const newF = document.querySelector('#new_first');
	newF.innerHTML = null;
	newF.style.width = 0;
	newF.style.height = 0;

	document.querySelector('#button_for_open_menu').onclick =()=> menuShow();

	document.querySelector('#button_for_new_move').onclick = function() {
		menuHide();
		gameEvents[ randoM( gameEvents.length)]()

		this.innerHTML++
		budget.innerHTML = ''
		mains.innerHTML = ''
	}
}
// minsN2 = () => {
// 	const ns = document.querySelector('#new_second')
// 	ns.innerHTML = null
// 	ns.style.width = 0
// 	ns.style.height = 0
// }
// minsN3 = () => {
// 	const nt = document.querySelector('#new_second')
// 	nt.innerHTML = null
// 	nt.style.width = 0
// 	nt.style.height = 0
// }
// document.querySelector('#so').onclick = () => minsN2();
// document.querySelector('#ss').onclick = () => minsN2();
// document.querySelector('#st').onclick = () => minsN2();
// document.querySelector('#to').onclick = () => minsN3();
// document.querySelector('#ts').onclick = () => minsN3();
// document.querySelector('#tt').onclick = () => minsN3();