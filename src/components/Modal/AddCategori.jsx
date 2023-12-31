import { Button, Modal } from "flowbite-react";
import PropTypes from "prop-types";
import { FileInput, Label } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDataCategory } from "../../redux/Actions/CourseActions";

const AddCategori = ({ addCategori, setAddCategori }) => {
  const dispatch = useDispatch();
  const [photoCategory, setPhotoCategory] = useState(null);
  const [name, setName] = useState("");
  const [isPublished, setIsPublished] = useState("");

  const handleCategory = () => {
    dispatch(addDataCategory(name, isPublished, photoCategory));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setPhotoCategory(selectedFile);
  };

  return (
    <Modal show={addCategori} onClose={() => setAddCategori(false)}>
      <Modal.Header>Tambah Data Kategori</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <div>
              <Label htmlFor="file-upload-helper-text" value="Upload file" />
            </div>
            <FileInput
              id="file-upload-helper-text"
              helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)."
              onChange={handleFileChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-Poppins text-[15px] mb-[4px]">
              Nama Kategori
            </label>
            <input
              type="text"
              className="border w-full py-3 px-4 rounded-2xl"
              placeholder="Text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-Poppins text-[15px] mb-[4px]">Publish</label>
            <div className=" w-full">
              <div className=" inset-y-0 right-0 flex items-center  w-full">
                <div className="relative w-full border rounded-2xl">
                  <select
                    className="appearance-none h-full w-full rounded-2xl bg-transparent  text-gray-700 py-3"
                    value={isPublished}
                    onChange={(e) => setIsPublished(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Pilih
                    </option>
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCategory}>Tambah</Button>
      </Modal.Footer>
    </Modal>
  );
};

AddCategori.propTypes = {
  addCategori: PropTypes.bool,
  setAddCategori: PropTypes.func,
};

export default AddCategori;
