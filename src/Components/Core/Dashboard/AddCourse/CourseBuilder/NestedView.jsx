import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { BiSolidDownArrow } from "react-icons/bi";

import { FaPlus } from "react-icons/fa";
import Confirmation from "../../../../Common/Confirmation";
import { setcourse } from "../../../../../Slices/Course";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import SubSectionModal from "./SubSectionModal";
const NestedView = ({ handleChangeEditSectionName }) => {
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const [confirmationmodal, setconfirmationmodal] = useState(null);
  const [viewsubsection, setviewsubsection] = useState(null);
  const [editsubsection, seteditsubsection] = useState(null);
  const [addsubsection, setaddsubsection] = useState(null);

  async function handleDeleteSection(sectionid) {
    const result = await deleteSection({
      sectionid,
      courseid: course._id,
      token,
    });

    if (result) {
      dispatch(setcourse(result));
    }
    setconfirmationmodal(null);
  }

  async function handleDeleteSubSection(subsectionid, sectionid) {
    const result = await deleteSubSection({ subsectionid, sectionid, token });

    const updatedsection = course?.coursecontent.map((section) =>
      section._id === sectionid ? result : section
    );
    const updatedcourse = { ...course, coursecontent: updatedsection };
    if (result) {
      dispatch(setcourse(updatedcourse));
    }
    setconfirmationmodal(null);
  }

  console.log("course", course);
  return (
    <div className="bg-richblack-700 px-4 py-3">
      {course?.coursecontent?.map((section) => (
        <details key={section._id}>
          <summary className="border-b-richblack-600 border-b-2 flex items-center justify-between p-2">
            <div className="flex gap-3">
              <RxDropdownMenu color="gray" fontSize={"25px"}/>
              <p className="text-richblack-25">{section.sectionname}</p>
            </div>

            <div className="flex">
              <button
                onClick={() =>
                  handleChangeEditSectionName(section.sectionname, section._id)
                }
              >
                <MdOutlineEdit color="gray" fontSize={"25px"}/>
              </button>

              <button
                onClick={() => {
                  setconfirmationmodal({
                    text1: "Delete this section",
                    text2: "All the lecture in this section is deleted",
                    btntext1: "delete",
                    btntext2: "Cancel",
                    btnhandler1: () => handleDeleteSection(section._id),
                    btnhandler2: () => setconfirmationmodal(null),
                  });
                }}
              >
                {console.log(confirmationmodal)}
                <MdOutlineDelete  color="gray" fontSize={"25px"}/>
              </button>

              <span className="mx-2 text-pure-greys-200">|</span>
              <div>
                <BiSolidDownArrow  color="gray" fontSize={"12px"}/>
              </div>
            </div>
          </summary>

          <div className="border-b-2 border-b-richblack-600">
            {section?.subsection?.map((data) => (
              <div key={data._id} onClick={() => setviewsubsection(data)} className="flex justify-between">
                <div className="flex gap-2 items-center text-richblack-25 ml-5">
                  <RxDropdownMenu   color="gray" fontSize={"25px"}/>
                  <p>{data.title}</p>
                </div>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-x-3"
                >
                  <button
                    onClick={() =>
                      seteditsubsection({ ...data, sectionid: section._id })
                    }
               
                  >

                  {console.log({ ...data, sectionid: section._id })}
                    <MdOutlineEdit  color="gray" fontSize={"22px"} />
                  </button>
                  <button
                    onClick={() => {
                      setconfirmationmodal({
                        text1: "Delete this subsection",
                        text2: "Selected subsection is deleted",
                        btntext1: "delete",
                        btntext2: "Cancel",
                        btnhandler1: () =>
                          handleDeleteSubSection(data._id, section._id),
                        btnhandler2: () => setconfirmationmodal(null),
                      });
                    }}
                  >
                    {console.log(confirmationmodal)}
                    <MdOutlineDelete  color="gray" fontSize={"22px"}/>
                  </button>
                </div>
              </div>
            ))}

            <button onClick={() => setaddsubsection(section._id)} className="flex gap-2 my-2 text-yellow-25 items-center ml-10">
              <FaPlus />
              <p>Add Lecture</p>
            </button>
          </div>
        </details>
      ))}

      {addsubsection ? (
        <SubSectionModal
          modaldata={addsubsection}
          setmodaldata={setaddsubsection}
          add={true}
        />
      ) : viewsubsection ? (
        <SubSectionModal
          modaldata={viewsubsection}
          setmodaldata={setviewsubsection}
          view={true}
        />
      ) : editsubsection ? (
        <SubSectionModal
          modaldata={editsubsection}
          setmodaldata={seteditsubsection}
          edit={true}
        />
      ) : (
        <div></div>
      )}

      {confirmationmodal ? (
        <Confirmation modaldata={confirmationmodal} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NestedView;
