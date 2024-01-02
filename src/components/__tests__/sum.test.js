import {sum} from '../sum';

test('handle sum function', ()=>{
    const result = sum(2,3);
    //Assertions
    expect(result).toBe(5);
})