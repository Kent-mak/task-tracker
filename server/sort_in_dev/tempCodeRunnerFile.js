function partition(front, end, arr){
    let i = front;
    let pivot = toDate(arr[end].date)

    for( let j = front; j < end; j++){
        let date = toDate(arr[j].date);
        console.log(j);
        console.log(date <= pivot );
        if(date <= pivot){
            [arr[i],arr[j]] = [arr[j], arr[i]];
            console.log(arr);
            i++;
        }
    }

    if(i > front){
        [arr[i],arr[end]] = [arr[end],arr[i]];
    }

    return [arr,i];
}

function quickSort(Arr, front, end){
    if(front < end){
        let pArr = partition(front,end,Arr);
        Arr = pArr[0];
        console.log(Arr)
        let pivot = pArr[1];
        quickSort(Arr, front, pivot-1);
        quickSort(Arr, pivot + 1, end);

    }
}

function sortTasks (taskArr){
    quickSort(taskArr, 0, taskArr.length-1);
    
    return taskArr;
}

console.log(tasks);
tasks = sortTasks(tasks);
console.log(tasks)
