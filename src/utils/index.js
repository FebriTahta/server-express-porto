// helpers yang bisa dipakai dimana saja
const multer = require('multer');

const pagination = (page, totalCount) => {
    // pagination standar
    const limit  = 3;
    const totalPages = Math.ceil(totalCount / limit);
    const offset = (page - 1) * limit;

    return {
        page: page,
        limit: limit,
        offset: offset,
        totalPages: totalPages,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage:     page == 1 || page < 1   // Jika halaman adalah 1
        ? null               // Previous page adalah null
        : page > totalPages  // Jika halaman melebihi total halaman
        ? 1                  // Previous page adalah 1
        : page > 1           // Jika halaman lebih besar dari 1 dan valid
        ? page - 1           // Previous page adalah halaman sebelumnya
        : null,              // Jika tidak ada kondisi lain, default null
        totalCount: totalCount,
    };
};

const createSlug = (slug) => {
    // for creating slug ex: some-title
    return slug.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
};

const readableSlug = (slug) => {
    // translate slug ex: some-title to some title
    return slug.replace(/-/g, ' ');
};

const errorDataFormatter = (errorMessage) => {
    // error catch handling
    const lines = errorMessage.split('\n').filter(line => line.trim() !== '');
    const result = {
        message: '',
        location: '',
        context: '',
        details: ''
    };

    for (const line of lines) {
        if (line.startsWith('Invalid')) {
            result.message = line;
        } else if (line.includes('.js:')) {
            result.location = line.trim();
        } else if (line.startsWith('→')) {
            result.context = line.slice(1).trim();
        } else if (line.startsWith('Unique constraint failed')) {
            result.details = line;
        }
    }

    return result;
};

// Middleware upload image
const uploadImage = () => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Direktori tempat menyimpan file
      },
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Buat nama file unik
      },
    });
  
    // Filter file berdasarkan tipe
    const fileFilter = (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'));
      }
    };
  
    // Middleware multer
    return multer({
      storage,
      limits: { fileSize: 2 * 1024 * 1024 }, // Batas ukuran file 2MB
      fileFilter,
    });
};

module.exports = { pagination, createSlug, readableSlug, errorDataFormatter, uploadImage};
