// feed_id int
// day date
// cut(threshold: int)
// filter ?

class Feed{
    feed_id: number;
    day: Date;

    constructor(){
        this.day = new Date();
        // TODO initialize feed_id 
    }

    cut():void{
        // does this belong here or with post objects? 
    }
}