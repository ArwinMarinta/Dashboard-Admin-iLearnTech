import NavSide from "../../components/Header/Side";
import Navbar from "../../components/Header/Desktop";
import HeadType from "../../data/HeadType";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getType } from "../../redux/Actions/AddCourses";
import AddIcon from "../../assets/add.svg";
import AddType from "../../components/Modal/AddType";
import { deleteDataType } from "../../redux/Actions/CourseActions";
import EditeType from "../../components/Modal/EditeType";

const ManageType = () => {
  const dispatch = useDispatch();
  const [activeModal, setActiveModal] = useState(null);
  const [typeId, setTypeId] = useState(null);

  const { type } = useSelector((state) => state.select);

  useEffect(() => {
    dispatch(getType());
  }, [dispatch]);

  const handleOpenModal = (modalType, typeId) => {
    setActiveModal(modalType);
    setTypeId(typeId);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setTypeId(null);
  };

  const handleDelete = (typeId) => {
    dispatch(deleteDataType(typeId));
  };

  return (
    <div className="flex mx-auto ">
      <NavSide />
      <div className="w-[100%] lg:w-[85%] mb-14  ">
        <div className="w-full ">
          <Navbar />
        </div>
        <div className="flex flex-col justify-center items-center container mt-10 mx-auto">
          <div className="flex flex-row justify-between w-full mb-4 items-center">
            <div className="font-bold font-Montserrat text-xl ">
              Data Type Kelas
            </div>
            <div className="flex flex-row gap-3">
              <button
                onClick={() => handleOpenModal("addType")}
                className="bg-DARKBLUE05 flex flex-row justify-center items-center p-[6px] rounded-2xl gap-1 text-white font-bold font-Montserrat"
              >
                <img src={AddIcon} />
                <p>Tambah</p>
              </button>
              <AddType
                addType={activeModal === "addType"}
                setAddType={handleCloseModal}
              />
            </div>
          </div>
          {/* <div className="relative overflow-x-auto"> */}
          <table className="table table-striped w-full text-left">
            <thead className="font-Montserrat text-base">
              <tr>
                {HeadType.map((data) => (
                  <th
                    key={data.id}
                    scope="col"
                    className="bg-LightBlue5 py-4 px-2 md:px-4 "
                  >
                    {data.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-left ">
              {type.map((data) => (
                <tr
                  key={data.id}
                  className="bg-white border-b font-Montserrat text-xs font-bold "
                >
                  <td scope="row" className=" pl-2 md:pl-4">
                    {data.id}
                  </td>
                  <td className=" py-4 px-2 md:px-4 ">{data.name ?? "-"}</td>

                  <td className="pr-4 px-2 md:px-4 ">
                    <div className="flex flex-row gap-2 font-bold text-white">
                      <div>
                        <button
                          onClick={() => handleOpenModal("editeType", data.id)}
                          className="p-1 bg-DARKBLUE05 rounded-md "
                        >
                          Ubah
                        </button>
                      </div>
                      <button
                        onClick={() => handleDelete(data.id)}
                        className="p-1 bg-red-600 rounded-md"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <EditeType
            editeTypes={activeModal === "editeType"}
            setEditeTypes={handleCloseModal}
            typeId={typeId}
          />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default ManageType;
