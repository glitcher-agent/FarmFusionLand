import Collection from "../model/Collection.js";

export const createCollection = async (req, res, next) =>{
    const newCollection = new Collection({
        storename: req.body.storename,
        productname: req.body.productname,
        price: req.body.price,
    });
    await newCollection.save();
    return res.status(200).json("product added Successfully");
}

export const updateCollection = async(req, res, next)=>{
    try {
        const newupdate =await Collection.findOne(
            {
                storename: req.body.storename,
                productname: req.body.productname
            });
        if(newupdate){
            const newData = await Collection.findOneAndUpdate(
                {storename: req.body.storename,
                productname: req.body.productname},
                {$set: req.body},
                {new: true}
            );
            return res.status(200).json("product details Updated")
        }else{
            return res.status(400).json("Bad Request")
        }
    } catch (error) {
        return res.status(500).json("Internal Server Issue"+error)
    }
}

export const getCollection = async(req,res,next)=>{
    try {

        const distinctProfiles = await Collection.distinct('storename', { storename: { $exists: true } });
        const uniqueProfiles = await Collection.aggregate([
          { $match: { storename: { $in: distinctProfiles } } },
          {
            $group: {
              _id: '$storename',
              profile: { $first: '$$ROOT' }
            }
          },
          { $replaceRoot: { newRoot: '$profile' } }
        ]).exec();
        return res.status(200).json(uniqueProfiles)
        

    } catch (error) {
        return res.status(500).json("Internal Server Issue")

    }
}

export const getProducts = async (req, res, next) => {
    try {
        const storeDocument = await Collection.findOne({ storename: req.params.storename });
        if (!storeDocument) {
            return res.status(404).json("Store not found");
        }
        const storename = storeDocument.storename;
        const distinctProfiles = await Collection.find({ storename: storename });
    
        if (distinctProfiles.length === 0) {
            return res.status(404).json("No products found for the specified store name");
        }
    
        return res.status(200).json(distinctProfiles);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Issue");
    }
    
  }