const inp1=require('./1-input.json') 
//const inp1=require('./2-input.json') 
let expense=inp1.expenseData;
let revenue=inp1.revenueData;
var map1 = new Map();
var map2=new Map();


let arr=[];


expense.map((r)=>{
    map1.set(r.startDate.substring(6,7), map1.get(r.startDate.substring(6,7)) + r.amount || r.amount);
    arr.push(r.startDate.substring(6,7))
})



revenue.map((r)=>{
    map2.set(r.startDate.substring(6,7), map2.get(r.startDate.substring(6,7)) + r.amount || r.amount);
    arr.push(r.startDate.substring(6,7))
})



map2.forEach((values,keys)=>{

    if(map1.has(keys)){
        map2.set(keys,map2.get(keys)-map1.get(keys));
    }
    
   
})

map1.forEach((values,keys)=>{
    if(!map2.has(keys)){
        map2.set(keys,-map1.get(keys));
    }
})

let max1=Math.max.apply(Math, arr.map(function(o) { return o; }))
let res=[];

let tmp='2020--01T00:00:00.000Z'

for (let i=1;i<=max1;i++){
    if(map2.has(`${i}`)){
        let k=map2.get(`${i}`);
        res.push({
            "amount": k,
            "startDate": tmp.slice(0, 5) + `0${i}` + tmp.slice(5)
        })
    }
    else{
        res.push({
            "amount": 0,
            "startDate": tmp.slice(0, 5) + `0${i}` + tmp.slice(5)
        })
    }
}

console.log(res);
