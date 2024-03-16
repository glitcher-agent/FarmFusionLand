import express from 'express';
import { createCollection, updateCollection, getCollection, getProducts } from '../controllers/collection.controller.js';


const router = express.Router()

router.post('/createcollection', createCollection);

router.put('/update/:storename/:productname', updateCollection);

router.get('/getcollection', getCollection);

router.get('/getcollectionproducts/:storename', getProducts);


export default router;