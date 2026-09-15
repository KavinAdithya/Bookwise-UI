import { useState } from "react";
import "../../css/Author/BookRegistration.css";
import { useEffect } from "react";
import {fetchCategoriesChoice} from "../../apiservice/categories/Category";
import Lookup from "../General/Lookup";
import { registerBook } from "../../apiservice/books/Book";

function BookRegistration() {

    const [title, setTitle] = useState("");
    const [ISBN, setISBN] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState();
    const [language, setLanguage] = useState("");
    const [totalCopies, setTotalCopies] = useState("");
    const [availableCopies, setAvailableCopies] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [borrowFee, setBorrowFee] = useState("");

    const [coverImage, setCoverImage] = useState(null);
    const [categories, setCategories] = useState([]);


    useEffect(() => async function fetchCategories() {
        await fetchCategoriesChoice()
            .then((response) => {
                setCategories(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    const handleImageChange = (event) => {
        setCoverImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        debugger;

        const book = {
            title,
            ISBN,
            description,
            categoryName : categories[categoryId].name,
            language,
            totalCopies: Number(totalCopies),
            availableCopies: Number(availableCopies),
            purchasePrice: Number(purchasePrice),
            borrowFee: Number(borrowFee)
        };

        const formData = new FormData();

        formData.append(
            "book",
            new Blob(
                [JSON.stringify(book)],
                {
                    type: "application/json"
                }
            )
        );

        formData.append("coverImage", coverImage);

        await registerBook(formData)
            .then((response) => {
                alert("Book registered successfully!");
                console.log("Book registered successfully:", response.data)
            })
            .catch((error) => {
                console.error("Error registering book:", error);
            });

    };

    return (
        <div className="book-registration">

            <h1>Register Book</h1>

            <p className="form-description">
                Add a new book to BookWise
            </p>

            <form onSubmit={handleSubmit}>

                {/* Title */}
                <div className="form-group">
                    <label>Title</label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        placeholder="Enter book title"
                        required
                    />
                </div>


                {/* ISBN */}
                <div className="form-group">
                    <label>ISBN</label>

                    <input
                        type="text"
                        value={ISBN}
                        onChange={(e) =>
                            setISBN(e.target.value)
                        }
                        placeholder="Enter ISBN"
                        required
                    />
                </div>


                {/* Description */}
                <div className="form-group">
                    <label>Description</label>

                    <textarea
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        placeholder="Enter book description"
                        rows="5"
                        required
                    />
                </div>


                {/* Category */}
                <div className="form-group">
                    
                    <Lookup
                        title="Category"
                        values={categories}
                        onSelect={setCategoryId}
                    />
                </div>


                {/* Language */}
                <div className="form-group">
                    <label>Language</label>

                    <input
                        type="text"
                        value={language}
                        onChange={(e) =>
                            setLanguage(e.target.value)
                        }
                        placeholder="Enter language"
                        required
                    />
                </div>


                {/* Copies */}
                <div className="copies-row">

                    <div className="form-group">
                        <label>Total Copies</label>

                        <input
                            type="number"
                            min="1"
                            value={totalCopies}
                            onChange={(e) =>
                                setTotalCopies(e.target.value)
                            }
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label>Available Copies</label>

                        <input
                            type="number"
                            min="0"
                            value={availableCopies}
                            onChange={(e) =>
                                setAvailableCopies(e.target.value)
                            }
                            required
                        />
                    </div>

                </div>


                {/* Purchase Price */}
                <div className="form-group">
                    <label>Purchase Price</label>

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={purchasePrice}
                        onChange={(e) =>
                            setPurchasePrice(e.target.value)
                        }
                        placeholder="Enter purchase price"
                        required
                    />
                </div>


                {/* Borrow Fee */}
                <div className="form-group">
                    <label>Borrow Fee</label>

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={borrowFee}
                        onChange={(e) =>
                            setBorrowFee(e.target.value)
                        }
                        placeholder="Enter borrow fee"
                        required
                    />
                </div>


                {/* Cover Image */}
                <div className="form-group">
                    <label>Book Cover</label>

                    <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleImageChange}
                        required
                    />

                    {coverImage && (
                        <p className="file-name">
                            {coverImage.name}
                        </p>
                    )}
                </div>


                {/* Submit */}
                <button
                    type="submit"
                    className="register-button"
                >
                    Register Book
                </button>

            </form>

        </div>
    );
}

export default BookRegistration;