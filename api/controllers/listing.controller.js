import Product from "../models/product.model.js";

export const createListing = async (req, res, next) => {

    try {
        const { title, description,specifications, images, category, subcategory, Seller ,price} = req.body;
        const listing = await Product.create({
            title,
            description,
            specifications,
            images,
            category,
            subcategory,
            Seller,
            price
        });
        return res.status(201).json({
            success: true, 
            listing
        });
    } catch (error) {
        console.error(error);
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
            success: false,
            error: error.message || 'Internal Server Error'
        });
    }
};

export const deleteListing = async (req, res) => {
    try {
        
        const listing = await Product.findById(req.params.id);
        console.log(listing);
        if (!listing) {
            return res.status(404).json({ error: "Listing not found!" });
        }
        
        // if (req.user.id !== listing.userRef) {
        //     return res.status(401).json({ error: "You can only delete your own listings!" });
        // }

        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json("Listing has been deleted!");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const updataListing = async (req, res) => {
    try {
        const listing = await Product.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        
        if (req.user.id !== listing.userRef) {
            return res.status(401).json({ error: "You can only update your own listings!" });
        }

        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return res.status(200).json(updatedListing);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getListing = async (req, res) => {
    try {
        const listing = await Product.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found!' });
        }
        return res.status(200).json(listing);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getListings = async (req, res) => {
    try{
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        const searchTerm = req.query.searchTerm || "";
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const products = await Product.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ]
        })
        .sort({ [sort]: order})
        .limit(limit)
        .skip(startIndex);

        return res.status(200).json(products)

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const getSellerListing = async (req, res, next) => {
    try{

        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        const searchTerm = req.query.searchTerm || "";
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';
        
        const listings = await Product.find({
            $and: [
                { $or: [
                    { title: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } }
                ]},
                { Seller: req.params.id } 
            ]
        })
        .sort({ [sort]: order})
        .limit(limit)
        .skip(startIndex);
        


        res.status(200)
            .json(listings);
    }catch(e){
        console.log(e);
    }
}




