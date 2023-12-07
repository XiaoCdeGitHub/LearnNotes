Array.prototype.splice = mySplice;
//splice方法向/从数组中添加/删除项目，然后返回被删除的项目。
function mySplice(start:number,nums:number,...args:any[]) {
    //从指定位置开始删除指定数量的元素
    let deleteArr = this.slice(start,start+nums); ;
}