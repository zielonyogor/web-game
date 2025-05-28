export interface Key{
	keyID:string;
	isDown:boolean;
	isUp:boolean;
	press:any; //function on press
	release:any; //function on release
} 

export class Keyboard {
	private keyList:Key[];

	constructor() {
		this.keyList = [];
		this.addEventListeners();
	}

	public addEventListeners(){
		window.addEventListener("keydown", this.downHandler.bind(this), false);
		window.addEventListener("keyup", this.upHandler.bind(this), false);
	}

	public removeEventListeners(){
		window.removeEventListener("keydown", this.downHandler);
		window.removeEventListener("keyup", this.upHandler);
	}
		
	public addKey(
		keyID:string, 
		pressed:() => void = () => {}, 
		released:() => void  = () => {}
	) {
		let key:Key = {
			keyID: keyID.toUpperCase(),
			isDown:false,
			isUp:true,
			press:pressed,
			release:released
		};
		
		this.keyList.push(key);

		return key;
	}

	public removeKey(value:Key) {
		const index: number = this.keyList.indexOf(value);
		if (index !== -1) {
			this.keyList.splice(index, 1);
		}
	}

	private downHandler(event:KeyboardEvent) {
		const pressedKey = event.key.toUpperCase(); // Normalize event.key
		for (const key of this.keyList) {
			if (pressedKey === key.keyID) {
				if (key.isUp && key.press) key.press();
				key.isDown = true;
				key.isUp = false;
				event.preventDefault();
				break;
			}
		}
	}

	private upHandler(event:KeyboardEvent) {
		const releasedKey = event.key.toUpperCase(); // Normalize event.key
		for (const key of this.keyList) {
			if (releasedKey === key.keyID) {
				if (key.isDown && key.release) key.release();
				key.isDown = false;
				key.isUp = true;
				event.preventDefault();
				break;
			}
		}
	}
}