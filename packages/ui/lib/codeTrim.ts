export const codeTrim = (code: string) => {

	if(!code) return code
   
	const visiblePart = code.trim()?.length <= 3 ? code : code.slice(-3);
	// const hiddenPart = "*".repeat(code?.length - visiblePart?.length, 3);
	const maskedCode = "***" + visiblePart;

   return maskedCode
}