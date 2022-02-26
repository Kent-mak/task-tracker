let tasks = [
    {
        name:1,
        date: '2022/02/20'
    },
    {
        name:2,
        date: '2022/02/13'
    },
    {
        name:3,
        date: '2022/03/14'
    },
    {
        name:4,
        date: '2022/04/11'
    } ,
    {
        name:5,
        date: '2022/03/11'
    }
]

function toDate (date){
    // yyyy/dd/mm   
    let year = date.slice(0,4);
    let month = date.slice(5,7);
    let day = date.slice(-2)
    year = parseInt(year,10);
    month = parseInt(month,10);
    day = parseInt(day,10);
    // console.log([year,month,day]);
    let dateObj = new Date(year,month-1,day)
    return dateObj;
}


// console.log(toDate('2022/02/09') <= toDate('2022/03/11'));


function partition(front, end, arr){
    let i = front;
    let pivot = toDate(arr[end].date)

    for( let j = front; j < end; j++){
        let date = toDate(arr[j].date);
        // console.log(j);
        // console.log(date <= pivot );
        if(date <= pivot){
            [arr[i],arr[j]] = [arr[j], arr[i]];
            // console.log(arr);
            i++;
            // console.log(i);
        }
    }
    // console.log('fin');
    // console.log(`i: ${i}`);    
    [arr[i],arr[end]] = [arr[end],arr[i]];
    

    return [arr,i];
}

function quickSort(Arr, front, end){
    if(front < end){
        let pArr = partition(front,end,Arr);
        Arr = pArr[0];
        // console.log(Arr)
        let pivot = pArr[1];
        // console.log(`pivot: ${pivot}`)
        quickSort(Arr, front, pivot-1);
        // console.log(Arr)
        quickSort(Arr, pivot + 1, end);

    }
}

function sortTasks (taskArr){
    quickSort(taskArr, 0, taskArr.length-1);
    
    return taskArr;
}

console.log(`original :`);
console.log(tasks)
tasks = sortTasks(tasks);
console.log(`sorted: `)
console.log(tasks);
