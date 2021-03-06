class BigArith{
	constructor(n){
		if(typeof(n) == "object" && n.name == "BigArith")
			this.value = n.valueOf();
		else if(typeof n == "undefined")
			this.value = "0";
		else if(n == "PI")
			this.value = "3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196";
		else if(n == "LN2")
			this.value = "0.6931471805599453";
		else if(n == "LN10")
			this.value = "2.302585092994046";
		else if(n == "LOG2E")
			this.value = "1.4426950408889634";
		else if(n == "LOG10E")
			this.value = "0.4342944819032518";
		else if(n == "SQRT1_2")
			this.value = "0.7071067811865476";
		else if(n == "SQRT2")
			this.value = "1.41421356237309504880168872420969807856967187537694807317667973799073247846210703885038753432764157273501384623091229702492483605585073721264412149709993583141322266592750559275579995050115278206057147";
		
		else
			this.value = this.verify(n);
		
		this.ObjName = "BigArith";
		this.ver = "v0.0-beta0.3";
	}
	
	/**	Name of object 
	*	@return {String} - Name of the object
	*/
	get name(){
		return this.ObjName;
	}
	
	/**	Code version 
	*	@return {String} - Version of code in format v0.0-beta0.0
	*/
	get version(){
		return this.ver;
	}
	
	/** Returns the primitive value of the BigArith object
	*	@return {String} - this.value
	*/
	valueOf(){
		return this.value;
	}

	/** Returns true if this.value is negative, false otherwise
	*	@return {boolean} - this.value negative?
	*/
	isNegative(){
		if(this.value[0] == "-") return true;
		return false;
	}
	
	/** Returns true if this.value is positive, false otherwise
	*	@return {boolean} - this.value positive?
	*/
	isPositive(){
		if(this.value[0] == "-") return false;
		return true;
	}
	
	/** Returns true if this.value is integer, false otherwise
	*	@return {boolean} - this.value is integer?
	*/
	isInteger(){
		if(this.value.indexOf(".") == -1) return true;
		return false;
	}
	
	/** Returns true if this.value is even, false otherwise
	*	@return {boolean} - this.value is even?
	*/
	isEven(){
		if(BigArith.compare(BigArith.divide(this.value, 2), BigArith.divide(this.value, 2).floor()) == "equal") return true;
		return false;
	}
	
	/** Returns true if this.value is NOT even and an integer, false otherwise
	*	@return {boolean} - this.value is NOT even and is an integer?
	*/
	isOdd(){
		if(!new BigArith(this.value).isEven() && new BigArith(this.value).isInteger()) return true;
		return false;
	}
	
	//TODO============
	squareRoot(){
		return new BigArith(Math.sqrt(this.value));
	}
	
	//TODO============
	cubeRoot(){
		return new BigArith(Math.cbrt(this.value));
	}
	
	
	/**	Return this.value%n (reminder of this.value/n)
	*	function modulus
	*	@param {String|Number|BigArth} - n - the divisor with this.value as the dividend
	*	@returns {BigArith} - reminder of this.value mod n
	*/
	modulus(n){
		return BigArith.modulus(this.value, n);
	}
	
	/**	Return a%b (reminder of a/b)
	*	function modulus
	*	@param {String|Number|BigArth} - a - the dividend
	*	@param {String|Number|BigArth} - b - the divisor.
	*	@returns {BigArith} - reminder of a mod b
	*/
	static modulus(a, b){
		var a = new BigArith(a);
		var b = new BigArith(b);
		if(BigArith.compare(b, "0") == "equal") return NaN;
		
		if(a.isInteger() && b.isInteger())
			return new BigArith(((a.isNegative())?"-":"")+BigArith.divWithRem(a, b)[1]);
		else
			return new BigArith(((a.isNegative())?"-":"")+BigArith.subtract(a.abs(), BigArith.multiply(BigArith.divide(a.abs(), b.abs()).valueOf().split(".")[0], b.abs())));
	}
	
	/**	Return the absolute value of this.value
	*	function abs
	*	@returns {BigArith} - Absolute value of this.value
	*/
	abs(){
		return (isNaN(this.value)) ? NaN : ((this.value.split("")[0] == "-") ? new BigArith((this.value.split("").splice(1, this.value.split("").length-1)).join("")) : new BigArith(this.value));
	}
	
	/**	Verify input evaluate to a valid number
	*	function verify
	*	@param {String|Number|BigArth} - n - Number within the safe integer limit or string in "-123.456" or  
	*	"negative one hundred and twenty three point four five six" form or a BigArith object
	*	@returns {String} - A string representation of @param in form "-123.456" or NaN if @param is not valid,
	*	or throws an error if input is in number form but not within safe limits.
	*/
	verify(n){
		//Empty string returns "0"
		if(n == "")
			return "0";
		
		//Can be already verified BigArith object
		if(typeof(n) == "object" && n.name == "BigArith")
			return n.valueOf();
			
		//Can be a number in form of 1000 or 1e3
		if(typeof(n) == 'number' && n <= Number.MAX_SAFE_INTEGER && n >= Number.MIN_SAFE_INTEGER)//Number must be within the safe integer range
			return n.toString();
		if(typeof(n) == 'number' && (n > Number.MAX_SAFE_INTEGER || n < Number.MIN_SAFE_INTEGER))
			throw new Error("The number you entered in typeof 'number' form is not within the safe limit. Please enter the number as a string.");
		
		//It can be string in form "-123.89"
		if(typeof(n) == 'string' && /\d/.test(n)/*This just test if it contains any digit, real test in below*/){
			n = n.replace(/^\s|\s$/g, "");
			let sign = false;
			if(n[0] == "-"){
				sign = true;
				n = n.slice(1, n.length);
			}
			else if(n[0] == "+"){
				n = n.slice(1, n.length);
			}
			
			n = n.split(".");
			if(n.length > 2)
				return NaN;
			if(n[0] == "")
				n[0] = "0";
			if(typeof(n[1]) == 'undefined')
				n[1] = "0";
			if(/^\d+$/.test(n[0]) && /^\d+$/.test(n[1])/*Test that it contains only digits*/){
				//Remove unnecessary zeros
				n[0] = n[0].replace(/^[0]+/g, "");
				n[1] = n[1].replace(/[0]+$/g, "");
				return ((sign)?"-":"") + ((n[0] == "")? "0":n[0]) + ((n[1] == "")?"":"."+n[1]);
			}
			else
				return NaN;
		}
		
		//It can be string in form of "negative one thousand point one two"
		if(typeof(n) == 'string'){
			n = n.toLowerCase();
			n = n.replace(/^\s|\s$/g, "").replace(/\s+/g, " ");
			n = n.replace(/\s(and)\s/g, " ");
			
			let fNum = "";
			let dNum = "";
			
			//Is Negative?
			let sign = false;
			n = n.split(" ");
			if(n[0] == "negative"){
				sign = true;
				n.shift();
			}
			else if(n[0] == "positive"){
				n.shift();
			}
			
			//The Mantissa part
			if(n.indexOf("point") >= 0){
				let decimal = n.splice(n.indexOf("point"), n.length - n.indexOf("point"));
				decimal.shift();
				dNum = decimal.map(a=>{if(this.w_Dict(a).length < 2 && this.w_Dict(a).length > 0) return this.w_Dict(a); else return NaN;}).join("");
			}
			else dNum = "0";
			
			//The Characteristic part
			if(n.includes("zero") && n.indexOf("zero") != 0) return NaN;
			let subArray = [];
			let subString = "";
			let prevSuffix = "0".repeat(63);
			let prevHSuffix = false;
			let prevValue = false;
			for(let i = 0; i < n.length; i++){
				if(typeof(this.w_Dict(n[i])) == 'undefined')return NaN; //Spelling errors and what-nots
				if(this.w_Dict(n[i]).length >= 3/*thousand and above*/){
					if(prevSuffix.length < this.w_Dict(n[i]).length) return NaN; //"one million three billion" is wrong
					if(!prevValue) return NaN; //"one million thousnad" is wrong
					subString += this.w_Dict(n[i]);
					subArray.push(subString);
					subString = "";
					prevSuffix = this.w_Dict(n[i]);
					prevValue = false;
					prevHSuffix = false;
				}
				else if(n[i] == "hundred"){
					if(prevHSuffix) return NaN; // "one hundred two hundred" is wrong
					if(typeof this.w_Dict(n[i-1]) == 'undefined') return NaN; //"hundred thousand" is wrong
					if(this.w_Dict(n[i-1]).length > 1) return NaN; 
					subString += this.w_Dict(n[i]);
					prevHSuffix = true;
				}
				else{
					subString = subString.substr(0, subString.length - this.w_Dict(n[i]).length) + this.w_Dict(n[i]);
					prevValue = true;
				}
			}
			subArray.push(subString);
			for(let i = 0; i < subArray.length; i++){
				fNum = fNum.substr(0, fNum.length - subArray[i].length) + subArray[i];
			}
			if(fNum == "") fNum = "0";
			
			//output
			if(/^\d+$/.test(fNum) && /^\d+$/.test(dNum)/*Test that it contains only digits*/){
				//Remove unnecessary zeros
				fNum = fNum.replace(/^[0]+/g, "");
				dNum = dNum.replace(/[0]+$/g, "");
				return (sign?"-":"") + ((fNum == "")?"0":fNum) + ((dNum == "")?"":"."+dNum);
			}
			else return NaN;
		}
		
		//That's all we support
		return NaN;
	}
	
	/**	Add n to this.value
	*	function add
	*	@param {Number|String|BigArith} - n - A summand with this.value as the second summand
	*	@returns {BigArith} - sum of this.value and @param
	*/
	add(n){
		return BigArith.add(this.value, n);
	}
	
	/**	Add two numbers together
	*	function add
	*	@param {Number|String|BigArith} - a - A summand.
	*	@param {Number|String|BigArith} - b - A summand.
	*	@returns {BigArith} - sum of a and b
	*/
	static add(a, b){
		var a = new BigArith(a).valueOf();
		var b = new BigArith(b).valueOf();
		var signFlag = "";
		
		if(isNaN(a) || isNaN(b))
			return NaN;
		
		if(a[0] == "-" && b[0] != "-")
			return BigArith.subtract(b, new BigArith(a).abs().valueOf());
		if(a[0] != "-" && b[0] == "-")
			return BigArith.subtract(a, new BigArith(b).abs().valueOf());
		if(a[0] == "-" && b[0] == "-"){
			signFlag = "-";
			a = new BigArith(a).abs().valueOf();
			b = new BigArith(b).abs().valueOf();
		}
		
		a = a.split(".");
		b = b.split(".");
		if(typeof(a[1]) == 'undefined') a[1] = "0";
		if(typeof(b[1]) == 'undefined') b[1] = "0";
		
		let max = Math.max(a[1].length, b[1].length);
		a[1] += "0".repeat(max - a[1].length);
		b[1] += "0".repeat(max - b[1].length);
		
		a = a[0] + a[1];
		b = b[0] + b[1];
		var result = "";
		var flag = 0;
		for(var i = a.length-1, j = b.length-1; i >= 0 || j >= 0; i--, j--)
		{
			var z = a.charAt(i)*1 + b.charAt(j)*1 + flag;
			if(z>9 && (i>0 || j>0))
			{
				flag = new BigArith(z/10).floor().valueOf()*1;
				result = (z-flag*10)+result;
			}
			else
			{
				result = z+result;
				flag = 0;
			}
		}
		
		result = result.slice(0, result.length - max) + "." + result.slice(result.length - max);
		result = result.replace(/^0+/g,"")/*Remove front zeros*/.replace(/\.0+$/g,"")/*Remove zeros after decimal point zeros*/;
		if(result[0] == ".") result = "0" + result;
		return ((result == "")? new BigArith("0") : new BigArith(((signFlag=="")?"":"-")+result));
	}
	
	/**	Subtract n from this.value
	*	function subtract
	*	@param {Number|String|BigArith} - n - The subtrahend with this.value as the minuend
	*	@returns {BigArith} - difference of this.value and @param
	*/
	subtract(n){
		return BigArith.subtract(this.value, n);
	}
	
	/**	Subtract b from a
	*	function subtract
	*	@param {Number|String|BigArith} - a - the Minuend
	*	@param {Number|String|BigArith} - b - the subtrahend 
	*	@returns {BigArith} - difference of a and b
	*/
	static subtract(a, b){
		var a = new BigArith(a).valueOf();
		var b = new BigArith(b).valueOf();
		if(isNaN(a) || isNaN(b))
			return NaN;
		
		if(a[0] == "-" && b[0] != "-")
			return BigArith.add(a, "-"+b);
		if(a[0] != "-" && b[0] == "-")
			return BigArith.add(a, new BigArith(b).abs().valueOf());
		if(a[0] == "-" && b[0] == "-"){
			//swap the absolute parameters
			let temp = new BigArith(a).abs().valueOf();
			a = new BigArith(b).abs().valueOf();
			b = temp;
		}
		
		a = a.split(".");
		b = b.split(".");
		if(typeof(a[1]) == 'undefined') a[1] = "0";
		if(typeof(b[1]) == 'undefined') b[1] = "0";
		
		let max = Math.max(a[1].length, b[1].length);
		a[1] += "0".repeat(max - a[1].length);
		b[1] += "0".repeat(max - b[1].length);
		
		let signFlag = "";
		if(BigArith.compare(a[0]+"."+a[1], b[0]+"."+b[1]) == "greater" || BigArith.compare(a[0]+"."+a[1], b[0]+"."+b[1]) == "equal"){
			a = a[0]+a[1];
			b = b[0]+b[1];
		}
		else{
			//swap the parameters
			let temp = a[0]+a[1];
			a = b[0]+b[1];
			b = temp;
			signFlag = "-";
		}
		
		a = a.split("");
		b = b.split("");
		var result = "";
		for(let i = a.length-1, j = b.length-1; i >= 0 || j >= 0; i--, j--){
			if(isNaN(parseInt(b[j]))) b[j] = "0";
			if(parseInt(a[i]) >= parseInt(b[j])){
				result = (parseInt(a[i]) - parseInt(b[j])).toString() + result;
			}
			else if(parseInt(a[i]) < parseInt(b[j])){
				if(i == 0)
					result = (parseInt(a[i]) - parseInt(b[j])).toString() + result;
				else{
					result = (parseInt(a[i])+10 - parseInt(b[j])).toString() + result;
					a[i-1] = parseInt(a[i-1])-1;
				}
			}
		}
		result = result.slice(0, result.length - max) + "." + result.slice(result.length - max);
		result = result.replace(/^0+/g,"")/*Remove front zeros*/.replace(/\.0+$/g,"")/*Remove zeros after decimal point zeros*/;
		if(result[0] == ".") result = "0" + result;
		return ((result == "")? new BigArith("0") : new BigArith((signFlag+result)));
	}
	
	/**	Multiply n and this.value
	*	function multiply
	*	@param {Number|String|BigArith} - n - the multiplier with this.value as the multiplicand
	*	@returns {BigArith} - product of this.value and @param
	*/
	multiply(n){
		return BigArith.multiply(this.value, n);
	}
	
	/**	Multiply a and b
	*	function multiply
	*	@param {Number|String|BigArith} - a - the multiplicand
	*	@param {Number|String|BigArith} - b - the multiplier
	*	@returns {BigArith} - product of a and b
	*/
	static multiply(a, b){
		var a = new BigArith(a).valueOf();
		var b = new BigArith(b).valueOf();
		var signFlag = "";
		
		if(a[0] == "-" && b[0] != "-"){
			signFlag = "-";
			a = new BigArith(a).abs().valueOf();
		}
		if(a[0] != "-" && b[0] == "-"){
			signFlag = "-";
			b = new BigArith(b).abs().valueOf();
		}
		if(a[0] == "-" && b[0] == "-"){
			a = new BigArith(a).abs().valueOf();
			b = new BigArith(b).abs().valueOf();
		}
		
		a = a.split(".");
		b = b.split(".");
		if(typeof(a[1]) == 'undefined') a[1] = "0";
		if(typeof(b[1]) == 'undefined') b[1] = "0";
			
		let max = Math.max(a[1].length, b[1].length);
		a[1] += "0".repeat(max - a[1].length);
		b[1] += "0".repeat(max - b[1].length);
		
		a = a[0] + a[1];
		b = b[0] + b[1];
		var results = [];
		for(var i = a.length-1; i >= 0; i--){
			var subSum = "";
			var flag = 0;
			for(var j = b.length-1; j >= 0; j--){
				var z = a.charAt(i)*b.charAt(j)+flag;
				if(z>9 && j>0){
					flag = new BigArith(z/10).floor().valueOf()*1;
					subSum = (z-flag*10)+subSum;
				}
				else{
					subSum = z+subSum;
					flag = 0;
				}
			}
			results.push(subSum);
		}
	  
		var result = "0";
		for(var i = 0; i < results.length; i++){
			result = BigArith.add(result, results[i]+"0".repeat(i));
		}
		result = result.valueOf(); //It's a BigArith
		if(max*2 > result.length) result = "0".repeat(max*2 - result.length) + result; //Problem with slice if result is shorter than max*2
		result = result.slice(0, result.length - max*2) + "." + result.slice(result.length - max*2);
		result = result.replace(/^0+/g,"")/*Remove front zeros*/.replace(/\.0+$/g,"")/*Remove zeros after decimal point zeros*/;
		if(result[0] == ".") result = "0" + result;
		return ((result == "")? new BigArith("0") : new BigArith((signFlag+result)));
	}
	
	/**	Return this.valus/n (division of this.valus and n)
	*	function divide
	*	@param {String|Number|BigArth} - n - The divisor with this.value as the dividend. 
	*	@returns {BigArith} - The quotient to 200 decimal places when necessary.
	*/
	divide(n){
		return BigArith.divide(this.value, n);
	}
	
	/**	Return a/b (division of a/b)
	*	function divide
	*	@param {String|Number|BigArth} - a - The dividend.
	*	@param {String|Number|BigArth} - b - The divisor.
	*	@returns {BigArith} - The quotient to 200 decimal places when necessary.
	*/
	static divide(a, b){
		var a = new BigArith(a).valueOf().split(".");
		var b = new BigArith(b).valueOf().split(".");
		
		//Note where the decimal points are and remove them
		let numeratorIndex = 0;
		let denominatorIndex = 0;
		if(typeof a[1] != "undefined")
			numeratorIndex = a[1].length;
		if(typeof b[1] != "undefined")
			denominatorIndex = b[1].length;
		a = a[0] + ((typeof a[1] != "undefined")?a[1]:"");
		b = b[0] + ((typeof b[1] != "undefined")?b[1]:"");
		
		let result = BigArith.divWithRem(a, b);
		let rem = result[1];
		let remResult = "0.";
		let count = 0;
		
		while(BigArith.compare(rem, "0") == "greater" && count < 201){
			rem += "0";
			let j = BigArith.divWithRem(rem, b);
			remResult +=  j[0];
			rem = j[1];
			count++;
		}
		if(remResult == "0.") remResult = "0";
		result = new BigArith(BigArith.add(result[0], remResult)).valueOf();
		let dPosition = (result.indexOf(".") == -1)?result.length : result.indexOf(".");
		
		//Numerator decimal point means we shift the decimal point in answer forward
		//Denominator decimal point means we shift the decimal point iin answer backward
		dPosition = dPosition+denominatorIndex-numeratorIndex;
		result = result.split(".");
		if(typeof result[1] == "undefined") result[1] = "0";
		if(dPosition < 0){
			result = "0." + "0".repeat(-1*dPosition) + result[0] + result[1];
		}
		else if(dPosition == 0){
			result = "0." + result[0] + result[1];
		}
		else if(dPosition > 0){
			if(dPosition <= result[0].length){
				result = result[0].slice(0, dPosition) + "." + result[0].slice(dPosition) + result[1];
			}
			else{
				dPosition -= result[0].length; 
				result = result[0] + result[1].slice(0, dPosition) +
					((dPosition-result[1].length>0)?"0".repeat(dPosition-result[1].length):"") + "." +
					result[1].substr(dPosition)+ "0";
			}
		}
	
		if(count == 201 /*&& BigArith.compare(precision, 200) == "equal"*/)
			return new BigArith(new BigArith(result).toFixed(200));
		/*if(BigArith.compare(precision, 200) == "lesser") suspend the use of precission for now toFixed should actually do
			return new BigArith(new BigArith(result).toFixed(precision));*/
		else
			return new BigArith(result);
	}
	
	/**	Return a/b (division of a/b)
	*	function divWithRem
	*	@param {String|Number|BigArth} - a - The dividend. Must always be integers.
	*	@param {String|Number|BigArth} - b - The divisor. Must always be integers.
	*	@returns {Array of integers} - [quotient, reminder]
	*/
	static divWithRem(a, b){
		var a = new BigArith(a);
		var b = new BigArith(b);
		if(isNaN(a) || isNaN(b))
			return NaN;
		
		if(!a.isInteger() || !b.isInteger()) throw new Error("divWithRem accepts only integers. Non integers passed in");
		if(BigArith.compare(b, 0) == "equal") throw new Error("Division by zero");
		let signFlag = false;
		
		if((a.isNegative() || b.isNegative()) && !(a.isNegative() && b.isNegative())) signFlag = true;
		
		a = a.abs().valueOf();
		b = b.abs().valueOf();
		
		
		let aLen = a.length;
		let aSub = "";
		let result = "0";
		let hold = a;
		for(let i = 0; i < aLen; i++){
			aSub += a[i];
			if(BigArith.compare(aSub, "0") == "equal"){result += "0";}
			else if(BigArith.compare(b, aSub) == "greater"){result += "0"; continue;} 
			else{
				let count = 0;
				hold = aSub;
				while(BigArith.compare(hold, b) != "lesser"){
					hold = BigArith.subtract(hold,b);
					count++;
				}
				result += count;
			}
			aSub = hold;
		}
		if(aSub.length > 1 && aSub[0] == "0"){
			hold = new BigArith(aSub).valueOf();
		}
		result = result.replace(/^0*/g,"");
		result = (result == "")? "0" : result;
		return [((signFlag)?"-":"")+result, hold];
	}
	
	/**	Comparing this.value to n
	*	function compare
	*	@param {String|Number|BigArth} - the number this.value is to be compared to. Can be negative and fraction
	*	@returns {String} - ("lesser" if this.value < n) - ("equal" if this.value == n) - ("greater" if this.value > n)
	*/
	compare(n){
		return BigArith.compare(this.value, n);
	}
	
	/**	Comparing a to b
	*	function compare
	*	@param {String|Number|BigArth} - numbers a and b as strings to be compared. Can be negative and fraction
	*	@returns {String} - ("lesser" if a < b) - ("equal" if a == b) - ("greater" if a > b)
	*/
	static compare(a, b){
		var a = new BigArith(a).valueOf();
		var b = new BigArith(b).valueOf();
		//Check for signs
		let cSign = false; let c = "";
		let dSign = false; let d = "";
		if(a[0] == "-"){
			cSign = true;
			c = new BigArith(a).abs().valueOf();
		}else c=a;
		if(b[0] == "-"){
			dSign = true;
			d = new BigArith(b).abs().valueOf();
		}else d=b;
	//console.log(c);
		c = c.split("."); d = d.split(".");
		if(typeof c[1] == 'undefined')c[1] = '0';
		if(typeof d[1] == 'undefined')d[1] = '0';
		
		c[1]=c[1].replace(/[0]*$/g,""); if(c[1] == "") c[1] ="0";
		d[1]=d[1].replace(/[0]*$/g,""); if(d[1] == "") d[1] ="0";
		let max = Math.max(c[1].length, d[1].length);
		c[1] += "0".repeat(max - c[1].length);
		d[1] += "0".repeat(max - d[1].length);
		
		if(cSign && dSign==false) return "lesser";
		if(dSign && cSign==false) return "greater";
		
		if(c[0].length < d[0].length) return (cSign && dSign)? "greater" : "lesser";
		if(c[0].length > d[0].length) return (cSign && dSign)? "lesser" : "greater";
	  
		//check characteristic
		for(let i = 0; i < c[0].length/*Length is equal so pick one*/; i++){
			if(c[0][i] > d[0][i]) return (cSign && dSign)? "lesser" : "greater";
			if(c[0][i] < d[0][i]) return (cSign && dSign)? "greater" : "lesser";
		}
		
		//check mantissa
		for(let i = 0; i < Math.max(c[1].length, d[1].length); i++){
			if(c[1][i] > d[1][i]) return (cSign && dSign)? "lesser" : "greater";
			if(c[1][i] < d[1][i]) return (cSign && dSign)? "greater" : "lesser";
		}
		return "equal";
	}
	
	/**	Comparing absolute value of a to absolute value of b
	*	function compareAbs
	*	@param {String} - numbers a and b as strings to be compared. Can be negative and fraction
	*	@returns {String} - ("lesser" if abs(a) < abs(b)) - ("equal" if abs(a) == abs(b)) - ("greater" if abs(a) > abs(b))
	*/
	compareAbs(n){
		return BigArith.compare(new BigArith(this.value).abs().valueOf(), new BigArith(n).abs().valueOf());
	}

	/**	Comparing absolute value of a to absolute value of b
	*	function compareAbs
	*	@param {String} - numbers a and b as strings to be compared. Can be negative and fraction
	*	@returns {String} - ("lesser" if abs(a) < abs(b)) - ("equal" if abs(a) == abs(b)) - ("greater" if abs(a) > abs(b))
	*/
	static compareAbs(a, b){
		return BigArith.compare(new BigArith(a).abs().valueOf(), new BigArith(b).abs().valueOf());
	}
	
	/**	Round this.value to the nearest integer
	*	function round
	*	@param {String} - this.value e.g "0.5"
	*	@returns {BigArith} - this.value rounded to nearest whole number e.g "1"
	*/
	round(){
		let n = this.value;
		if(n.includes(".")){
			n = n.split(".");
			if(BigArith.compare(n[1][0], "5") == "equal" || BigArith.compare(n[1][0], "5") == "greater"){
				if(new BigArith(n[0]).isPositive())
					n[0] = BigArith.add(n[0], "1").valueOf();
				else
					n[0] = BigArith.subtract(n[0], "1").valueOf();
			}
			n = n[0];
		}
		return new BigArith(n);
	}
	
	/**	Floor this.value
	*	function floor
	*	@param {String} - this.value
	*	@returns {BigArith} - floored value of this.value
	*/
	floor(){
		let n = this.value;
		if(n.includes(".")){
			n = n.split(".")[0];
			if(new BigArith(n).isNegative()){
				n = BigArith.subtract(n, "1");
			}
		}
		return new BigArith(n);
	}
	
	/**	Ceil this.value
	*	function ceil
	*	@param {String} - this.value
	*	@returns {BigArith} - ceiled value of this.value
	*/
	ceil(){
		let n = this.value;
		if(n.includes(".")){
			n = BigArith.add(n.split(".")[0], "1");
			if(n.isNegative()){
				n = BigArith.subtract(n, "1");
			}
		}
		return new BigArith(n);
	}
	
	/**	Return this.value to fixed decimal point
	*	function toFixed
	*	@param {Number|String|BigArith} - the number of digits needed after decimal point. Valid input is 0 to 200
	*	@returns {String} - this.value fixed to @param decimal points.
	*/
	toFixed(d){
		let e = new BigArith(this.verify(d)).floor().valueOf();
		if(BigArith.compare(d, 0) == "lesser" || BigArith.compare(d, 200) == "greater") throw new Error("Argument must be between 0 and 200! " + e + " supplied.");
		let n = this.value;
		if(n.includes(".")){
			n = n.split(".");
			if(BigArith.compare(e, "0") == "equal"){
				if(BigArith.compare(n[1][0], "5") == "equal" || BigArith.compare(n[1][0], "5") == "greater"){
					n[0] = BigArith.add(n[0], "1").valueOf();
					n[1] = "0";
				}
				else n[1] = "0";
			}
			else if(BigArith.compare(n[1].length.toString(), e) == "lesser"){ n[1] += "0".repeat(e - Number(n[1].length));}
			else if(BigArith.compare(n[1].length.toString(), e) == "greater"){
				if(BigArith.compare(n[1][e], "5") == "equal" || BigArith.compare(n[1][e], "5") == "greater"){
					let z0 = n[1].slice(0, e).length;
					let z1 = BigArith.add(n[1].slice(0, e), "0").valueOf().length; //To check if it have leading zeros hence 0.00456 can become 0.456
					n[1] = BigArith.add(n[1].slice(0, e), "1").valueOf();
					let z2 = n[1].length;
					
					if(z0 != z1){//Has leading zero
						n[1] = "0".repeat(z0-z1) + n[1];
					}
					
					if(z2 > z1){
						if(n[1][0] != "0"){
							n[0] = BigArith.add(n[0], "1").valueOf();
							n[1] = "0".repeat(e);
						}
						else{
							n[1] = n[1].substr(1);
						}
					}
				}
				else n[1] = n[1].slice(0, e);
			}
			n = n[0]+((n[1]!="0")?("."+n[1]):"");
		}
		else n=n+((BigArith.compare(e, "0") == "greater")?("."+"0".repeat(e)):"");
		return n; 
	}
	
	/**	Random number between 0 and 1 (1 exclusive)
    *	function random
    *	@returns {String} - any number between 0 and 1 (1 exclusive)
    */
	static random(){
		let len = new BigArith(Math.random()*201).floor().valueOf()*1;
		let n = "0";
        for(let i = 0; i < len; i++){
			n += new BigArith(Math.random()*10).floor().valueOf();
		}
		return (n == "0")?n:("0."+n.slice(1));
	}
	
	/**	Random int between min and max (min inclusive, max exclusive) 
    *	function randomInt
	*	@param {Number|String|BigArith} - minimum and maximum integer that can be returned (min inclusive, max exclusive)
    *	@returns {String} - any integer between min and max
    */
	static randomInt(min, max){
		return (new BigArith(BigArith.random()).multiply(new BigArith(max).subtract(min)).add(min)).floor().valueOf();
	}
	
	/**	Word Dictionary
	*	function w_Dict
	*	@param {String} - Word value for numbers e.g "one"
	*	@returns {String} - String value of @param e.g "1"
	*/
	w_Dict(w){
		/*Word Dictionary*/
		var w_Dict = [];
		w_Dict["zero"] = "0"; w_Dict["one"] = "1"; w_Dict["two"] = "2"; w_Dict["three"] = "3"; w_Dict["four"] = "4"; w_Dict["five"] = "5"; w_Dict["six"] = "6"; w_Dict["seven"] = "7"; w_Dict["eight"] = "8"; w_Dict["nine"] = "9"; w_Dict["ten"] = "10"; 
		w_Dict["eleven"] = "11"; w_Dict["twelve"] = "12"; w_Dict["thirteen"] = "13"; w_Dict["fourteen"] = "14"; w_Dict["fifteen"] = "15"; w_Dict["sixteen"] = "16"; w_Dict["seventeen"] = "17"; w_Dict["eighteen"] = "18"; w_Dict["nineteen"] = "19"; w_Dict["twenty"] = "20"; 
		w_Dict["thirty"] = "30"; w_Dict["forty"] = "40"; w_Dict["fifty"] = "50"; w_Dict["sixty"] = "60"; w_Dict["seventy"] = "70"; w_Dict["eighty"] = "80"; w_Dict["ninety"] = "90"; w_Dict["hundred"] = "0".repeat(2); 
		w_Dict["thousand"] = "0".repeat(3); w_Dict["million"] = "0".repeat(6); w_Dict["billion"] = "0".repeat(9); w_Dict["trillion"] = "0".repeat(12); w_Dict["quadrillion"] = "0".repeat(15); w_Dict["quintillion"] = "0".repeat(18); w_Dict["sextillion"] = "0".repeat(21); w_Dict["septillion"] = "0".repeat(24); w_Dict["octillion"] = "0".repeat(27); w_Dict["nonillion"] = "0".repeat(30); 
		w_Dict["decillion"] = "0".repeat(33); w_Dict["undecillion"] = "0".repeat(36); w_Dict["duodecillion"] = "0".repeat(39); w_Dict["tredecillion"] = "0".repeat(42); w_Dict["quattuordecillion"] = "0".repeat(45); w_Dict["quindecillion"] = "0".repeat(48); w_Dict["sexdecillion"] = "0".repeat(51); w_Dict["septendecillion"] = "0".repeat(54); w_Dict["octodecillion"] = "0".repeat(57); w_Dict["novemdecillion"] = "0".repeat(60); w_Dict["vigintillion"] = "0".repeat(63);
		return w_Dict[w];
	}
	
	/**	Word Dictionary 2
	*	function w_Dict2
	*	@param {String} - number as string e.g "1"
	*	@returns {String} - String value of @param e.g "one"
	*/
	w_Dict2(w){
		/*Word Dictionary*/
		var w_Dict = []; w_Dict[""] = "";
		w_Dict["0"] = "zero"; w_Dict["1"] = "one"; w_Dict["2"] = "two"; w_Dict["3"] = "three"; w_Dict["4"] = "four"; w_Dict["5"] = "five"; w_Dict["6"] = "six"; w_Dict["7"] = "seven"; w_Dict["8"] = "eight"; w_Dict["9"] = "nine"; w_Dict["10"] = "ten"; 
		w_Dict["11"] = "eleven"; w_Dict["12"] = "twelve"; w_Dict["13"] = "thirteen"; w_Dict["14"] = "fourteen"; w_Dict["15"] = "fifteen"; w_Dict["16"] = "sixteen"; w_Dict["17"] = "seventeen"; w_Dict["18"] = "eighteen"; w_Dict["19"] = "nineteen"; w_Dict["20"] = "twenty"; 
		w_Dict["30"] = "thirty"; w_Dict["40"] = "forty"; w_Dict["50"] = "fifty"; w_Dict["60"] = "sixty"; w_Dict["70"] = "seventy"; w_Dict["80"] = "eighty"; w_Dict["90"] = "ninety"; w_Dict["0".repeat(2)] = "hundred"; 
		w_Dict["0".repeat(3)] = "thousand"; w_Dict["0".repeat(6)] = "million"; w_Dict["0".repeat(9)] = "billion"; w_Dict["0".repeat(12)] = "trillion"; w_Dict["0".repeat(15)] = "quadrillion";  w_Dict["0".repeat(18)] = "quintillion"; w_Dict["0".repeat(21)] = "sextillion"; w_Dict["0".repeat(24)] = "septillion"; w_Dict["0".repeat(27)] = "octillion"; w_Dict["0".repeat(30)] = "nonillion"; 
		w_Dict["0".repeat(33)] = "decillion"; w_Dict["0".repeat(36)] = "undecillion"; w_Dict["0".repeat(39)] = "duodecillion"; w_Dict["0".repeat(42)] = "tredecillion"; w_Dict["0".repeat(45)] = "quattuordecillion"; w_Dict["0".repeat(48)] = "quindecillion"; w_Dict["0".repeat(51)] = "sexdecillion"; w_Dict["0".repeat(54)] = "septendecillion"; w_Dict["0".repeat(57)] = "octodecillion"; w_Dict["0".repeat(60)] = "novemdecillion"; w_Dict["0".repeat(63)] = "vigintillion";
		return w_Dict[w];
	}
	
		
	/**	Word representation of this.value
	*	@return {String} - this.value in words
	*/
	toWords(){
		let x = this.value;
		let n = "", sign = false;
		if(x[0] == "-"){
			n = x.substr(1);
			sign = true;
		}
		else n=x;
		
		n = n.split(".");
		if(typeof n[0] == 'undefined') n[0] = "0";
		if(typeof n[1] == 'undefined') n[1] = "0";
		n[0] = n[0].replace(/^[0]*/g,""); if(n[0] == '') n[0] = "0";
		n[1] = n[1].replace(/[0]*$/g,"");
		
		//Characteristic part
		let c = [...n[0]].reverse();
		
		//Group into chunk of three's
		let chunk = [], cj = "", count = 0;
		for(let i = 0; i < c.length; i++){
		  if(count == 2){
			cj=c[i]+cj;
			chunk.push(cj);
			count = 0;
			cj = "";
			continue;
		  }
		  cj=c[i]+cj;
		  count++;
		}
		if(cj != "")chunk.push(cj);
		chunk = chunk.reverse();
		
		let word = "";
		for(let i = 0; i < chunk.length; i++){
			let m = chunk[i];
			if(m =="000") continue;
			if(m.length == 3){
				if(m[0] != "0"){
					word += this.w_Dict2(m[0]) + " hundred ";
					if(m[1] + m[2] != "00") word += "and "
				}
				if(m[1] == "1") word += " "+this.w_Dict2(m[1]+m[2]);
				else if(m[1] > "1") word += " "+this.w_Dict2(m[1]+"0");
				if(m[2] != "0" && m[1] != "1") word += " "+this.w_Dict2(m[2]);
			}
			if(m.length == 2){
				if(m[0] == "1")
				{
					word += " "+this.w_Dict2(m[0]+m[1]);
				}
				else{
					if(m[0] != "0")
						word += " "+this.w_Dict2(m[0]+"0");
					if(m[1] != "0")
						word += " "+this.w_Dict2(m[1]);
				}
			}
			if(m.length == 1){
				if(m[0] != "0")
					word += " "+this.w_Dict2(m[0]);
			}
			word += " "+this.w_Dict2("0".repeat(3*(chunk.length-i-1))) + " ";
		}
		
		//Mantissa part
		if(n[1] != "") word += " point";
		for(let i = 0; i < n[1].length; i++)
		{
			word += " "+this.w_Dict2(n[1][i]);
		}
		return (sign?"negative ":"") + word.replace(/\s+/g," ").trim();
	}
}
