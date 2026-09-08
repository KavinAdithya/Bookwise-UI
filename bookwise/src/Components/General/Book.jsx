function Book({ book }) {
     return (
        <div className="book-card">

            {/* Book Cover */}
            <div className="book-cover">
                <img
                    src={book.image}
                    alt={book.title}
                />
            </div>

            {/* Book Information */}
            <div className="book-info">

                <h3 className="book-title">
                    {book.title}
                </h3>

                <p className="book-author">
                    {book.author}
                </p>

                <div className="book-meta">

                    <span>
                        ⭐ {book.rating}
                    </span>

                    <span>
                        {book.category}
                    </span>

                </div>

                <div className="book-bottom">

                    <span className="book-price">
                        ₹{book.price}
                    </span>

                    <Link
                        to={`/books/${book.id}`}
                        className="view-book-button"
                    >
                        View Details
                    </Link>

                </div>

            </div>

        </div>
    );
}
