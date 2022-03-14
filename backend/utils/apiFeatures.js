class APIFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
        // console.log(query)
    }

    // Search Method
    search(){
        const keyword = this.queryStr.keyword ? {
            name :{
                   $regex : this.queryStr.keyword,
                   $option : 'i'
            } 
        } : {}

       
        this.query = this.query.find({...keyword});
        return this;
    }

    // Filter method
    filter(){
        // console.log(query)
        const queryCopy = {...this.queryStr}
        console.log (queryCopy);
        console.log(this.queryStr);

        // removing field form the query
        const removeFields = ['keyword','limit','page'];
        removeFields.forEach(function(element){
            delete queryCopy[element]
        });

        // console.log(queryCopy);

        // Advance filters for price
        console.log(queryCopy);
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        console.log(queryStr)
        this.query = this.query.find(JSON.parse(queryStr));
        // console.log(this);
        return this; 

    }
   
    // Filter method : Admin
    
    // Pagination Method
    pagination(resPerPage){
        const currentPage =  Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }

}

module.exports = APIFeatures;
