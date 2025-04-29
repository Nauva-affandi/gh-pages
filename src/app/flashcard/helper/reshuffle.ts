// flashcard

export const  moveCard = (arr, percentage) => {
  if (arr.length > 1) {
    const new_position = Math.max(1, Math.floor(arr.length * (percentage / 100)));
    
    arr.splice(new_position, 0, arr.shift());
  }
}


export const next_btn = (arr) => {
	if(arr.length > 1) {
		arr[0].mistakeData = {soft : 0, hard : 0}
		arr.push(arr.shift());
	}
}


export const next_forgot1_btn = (arr) => {
	let card = arr[0]
	if (arr.length > 1) {
		if(!card.mistakeData) {
			card.mistakeData = {soft: 0,hard: 0}
		}
		
		card.mistakeData.soft++
		let percentage = Math.max(20, 50 - card.mistakeData.soft * 3)
		
		if(card.mistakeData.hard > 0) {
			for (let i = 1; i < card.mistakeData.hard && card.mistakeData.hard > 1; i++) {
				card.mistakeData.hard -= 2
				percentage++
			}
		}
		
		moveCard(arr, percentage)
	}
}


export const next_forgot2_btn = (arr) => {
  let card = arr[0];
  if (arr.length > 1) {
    if (!card.mistakeData) {
      card.mistakeData = { soft: 0, hard: 0 };
    }
    
		card.mistakeData.hard++
    let percentage = Math.max(45, 75 - card.mistakeData.hard * 3)
    
		if(card.mistakeData.soft > 0) {
			for (let i = 1; i < card.mistakeData.soft && card.mistakeData.soft > 1; i++) {
				card.mistakeData.soft -= 2
				percentage += 10
			}
		}
    
    moveCard(arr, percentage)
  }
}