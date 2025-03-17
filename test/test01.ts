let x = 0;
const a = function*() {
    while(true){
        x += 1;
        if(x>5){
            break;
        }
        yield;
    }
}

a();