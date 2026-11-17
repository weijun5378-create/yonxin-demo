export const ENQUIRY_ENDPOINT='https://formsubmit.co/ajax/info@yxtubularmotor.com';
export async function sendEnquiry(fields,fetcher=fetch){
 const response=await fetcher(ENQUIRY_ENDPOINT,{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({...fields,_subject:'YONGXIN website enquiry / 网站询盘',_template:'table',_replyto:fields.email}),signal:AbortSignal.timeout(25000)});
 if(!response.ok)throw new Error('http');
 const data=await response.json();
 if(/activat|confirm.*email|verify.*email/i.test(String(data.message||'')))throw new Error('activation');
 if(data.success!==true&&data.success!=='true')throw new Error('rejected');
 return data;
}
