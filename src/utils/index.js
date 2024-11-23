// helpers yang bisa dipakai dimana saja

const pagination = (page, totalCount) => {

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
    return slug.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
};

const readableSlug = (slug) => {
    return slug.replace(/-/g, ' ');
}

const errorDataFormatter = (errorMessage) => {
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
}

module.exports = { pagination, createSlug, readableSlug, errorDataFormatter};
