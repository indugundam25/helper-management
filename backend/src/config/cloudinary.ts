import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

const cloud_name = "dzgeyeyto"
const api_key = "284568567968357"
const api_secret = "XXbAXGqfS7bLed9mbb5DJ6rOg1U"


cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
});

export default cloudinary;
