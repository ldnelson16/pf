

export async function typewrite2(type,setType,setCursor) {
  setCursor("");
  for(let i=0;i<type.length-1;++i){
    setType(type.slice(0,i+1)+"|"+"\u{0020}".repeat(type.length-i));
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  setType(type);
  setCursor("_");
}