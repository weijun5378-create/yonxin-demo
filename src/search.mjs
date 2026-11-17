export const normalizeSearch = value => String(value).toLowerCase().normalize('NFKC').replace(/[\s\-_/·]+/g,'');
export const applicationTerms = {
 motor:'卷帘 斑马帘 天窗帘 投影幕 遮阳篷 卷门 roller zebra skylight projection screen awning shutter tubular motor mechanical 机械限位',
 curtain:'窗帘 布帘 室内遮阳 curtain drapery indoor shading',
 controls:'遥控器 墙面开关 接收器 remote transmitter wall switch receiver control',
 accessories:'驱动轮 适配环 安装 支架 drive wheel adapter mounting bracket accessories'
};
export function searchProducts(families,models,query,filter='all'){
 const tokens=query.trim().split(/\s+/).filter(Boolean).map(normalizeSearch);
 const records=families.flatMap(f=>f.id==='motor'?models.map((m,i)=>({...f,resultId:m[0],modelIndex:i,modelName:m[0],spec:`${m[1]} N·m · ${m[2]} rpm · 230V / 50Hz`,searchText:`${m[0]} ${m[1]}nm ${m[1]}N·m ${m[2]}rpm 230V 50Hz IP44 35mm Φ35 ${m[3]}W`} )):[{...f,resultId:f.id}]);
 return records.filter(r=>(filter==='all'||r.id===filter)&&tokens.every(t=>normalizeSearch(`${r.name} ${r.en} ${r.desc} ${applicationTerms[r.id]} ${r.searchText||''}`).includes(t)));
}
