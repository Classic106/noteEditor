const ValidTitle = val =>{
    if(!(/^.{3,120}$/gi).test(val) && val !== '') return false;
    return true;
}

const ValidDescription = val =>{
    if(!(/^.{5,500}$/gi).test(val) && val !== '') return false;
    return true;
}

const MySortArray = (arr, value, sort) =>{
    
    const newArr = [...arr];
    
    if(!arr || !Array.isArray(arr) || arr.length === 0) return;
    if(!value) return;

    const SortAscent = (a, b) =>{
        if(a[value] < b[value]) return -1;
        if(a[value] > b[value]) return 1;
        return 0;
    }
    
    const SortDescent = (a, b) =>{
        if(a[value] > b[value]) return -1;
        if(a[value] < b[value]) return 1;
        return 0;
    }

    if(sort === 'ASK') return newArr.sort(SortAscent);
    if(sort === 'DESK') return newArr.sort(SortDescent);
    
    return newArr;
}

export {
    ValidTitle, ValidDescription, MySortArray
};
