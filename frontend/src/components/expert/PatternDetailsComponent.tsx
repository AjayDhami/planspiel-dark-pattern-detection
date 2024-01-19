import React, { useState } from "react";
import Comments from "./Comments";
import { IoMdClose } from "react-icons/io";
import { PatternDetailsProps } from "../../types";
import ConfirmVerifyModal from "./ConfirmVerifyModal";
import {
  getSpecificPattern,
  stringAvatar,
  CommentPost,
} from "../../services/expertServices";
import { useExpertContext } from "../../context/ExpertContext";
import { LiaEdit } from "react-icons/lia";
import PatternUpdateForm from "./PatternUpdateForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withExpertAuth from "../../hoc/withExpertAuth";
import Avatar from "@mui/material/Avatar";

const PatternDetailsComponent: React.FC<PatternDetailsProps> = ({
  isOpen,
  onClose,
  expertId,
}) => {
  const [commentText, setCommentText] = useState<string>("");
  const [commentTextClicked, setCommentTextClicked] = useState<boolean>(false);
  const [isPatternExist, setIsPatternExist] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const { patternData, setPatternData } = useExpertContext();
  const getBgColorClass =
    patternData.phaseColor === "#F9C32F"
      ? "bg-[#F9C32F]"
      : patternData.phaseColor === "#E6321D"
      ? "bg-[#E6321D]"
      : "bg-[#538D3F]";
  const expertVerificationPhase = patternData.expertVerifications.map(
    (verification) => verification.expertVerificationPhase
  );
  const expertName = localStorage.getItem("userName");
  const [verifyClicked, setVerifyClicked] = useState<boolean>(false);
  const handleCommentSubmit = async () => {
    setCommentTextClicked(false);
    try {
      const commentObj = await CommentPost(
        patternData.id,
        patternData.websiteId,
        expertId,
        commentText
      );
      if (commentObj === 201) {
        toast.success("Comment added successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        const response = await getSpecificPattern(
          patternData.id,
          patternData.websiteId
        );
        setCommentText("");
        if (response) {
          setPatternData(response);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };
  const handleClose = () => {
    setEditing(false);
    setCommentTextClicked(false);
    onClose();
  };
  const verifyOpen = (patternExist: boolean) => {
    setIsPatternExist(patternExist);
    setVerifyClicked(true);
  };
  const verifyClose = () => {
    setVerifyClicked(false);
  };
  const onCloseEdit = () => {
    setEditing(false);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white px-4 py-2 rounded-lg relative z-30 w-3/5 h-4/5 overflow-y-scroll">
        <>
          <ConfirmVerifyModal
            isOpen={verifyClicked}
            onClose={verifyClose}
            expertId={expertId}
            patternExists={isPatternExist}
          />
          <div className="flex justify-end">
            <IoMdClose
              onClick={handleClose}
              className="hover:bg-blue-200 rounded-lg p-2 text-4xl"
            />
          </div>
          {editing ? (
            <>
              <PatternUpdateForm isOpen={editing} onClose={onCloseEdit} />
            </>
          ) : (
            <div className="space-y-4 px-4 pt-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h2 className="font-bold text-2xl text-blue-500 mr-5">
                    {patternData.patternType}
                  </h2>
                  <div
                    className={`text-white p-2 rounded-2xl ${getBgColorClass}`}
                  >
                    {patternData.phaseText}
                  </div>
                </div>
                {patternData.createdByExpertId === expertId ? (
                  <div className="flex items-center text-md ">
                    <h2 className="italic font-serif text-gray-500 mr-2">
                      Added By - you
                    </h2>
                    <div>
                      <LiaEdit
                        className="hover:bg-blue-200 rounded-lg p-2 text-4xl"
                        onClick={() => setEditing(true)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center text-md ">
                    <h2 className="text-gray-500 italic font-serif text-gray-400 mr-2">
                      Added By - {patternData.expertName}
                    </h2>
                  </div>
                )}
              </div>
              <div>Detected at : {patternData.detectedUrl}</div>
              <div className="border-b-2 p-4 bg-gray-100 rounded-lg">
                <h2 className="font-bold">Description</h2>
                <p>{patternData.description}</p>
              </div>
            </div>
          )}
          <h2 className="px-4 py-2 text-xl text-blue-500 font-bold">
            Verification
          </h2>
          <div className="grid grid-cols-2 gap-4 mx-4">
            {patternData.expertVerifications.map((verify) =>
              verify.expertId === expertId &&
              verify.expertVerificationPhase === "NotVerified" ? (
                <div className="px-4 py-3 flex justify-center col-span-1 bg-gray-100 rounded-lg border-b-2">
                  <button
                    className="border-2 bg-white hover:bg-red-300 p-2 mr-5 rounded-xl"
                    onClick={() => verifyOpen(true)}
                  >
                    Verify with pattern
                  </button>
                  <button
                    className="border-2 bg-white hover:bg-green-300 p-2 rounded-xl"
                    onClick={() => verifyOpen(false)}
                  >
                    Verify without pattern
                  </button>
                </div>
              ) : verify.expertId === expertId ? (
                <div className="px-4 py-3 italic font-serif bg-gray-100 flex justify-center col-span-1 rounded-lg border-b-2">
                  <h2>Already Verified : {verify.expertVerificationPhase}</h2>
                </div>
              ) : null
            )}
            <div className="col-span-1 bg-gray-100 rounded-lg border-b-2 p-3">
              {patternData.expertVerifications.map((verify) =>
                verify.expertId !== expertId ? (
                  <div className="italic font-serif flex justify-center">
                    {verify.expertName} : {verify.expertVerificationPhase}
                  </div>
                ) : null
              )}
            </div>
          </div>
          <div>
            {expertVerificationPhase.includes("NotVerified") ? (
              <div className="col-span-full mt-2 px-4 pt-4 pb-2 flex items-center">
                <Avatar
                  {...stringAvatar(expertName ? expertName : "")}
                  className="mr-2"
                />
                <textarea
                  name="description"
                  id="patterndescription"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onClick={() => setCommentTextClicked(true)}
                  className="block w-full rounded-md border-0 h-10 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  placeholder="Add a comment"
                ></textarea>
              </div>
            ) : null}
            {commentTextClicked ? (
              <div className="px-4">
                <button
                  className="col-span-1 bg-blue-300 p-2 rounded-lg hover:bg-blue-400 mt-2"
                  onClick={handleCommentSubmit}
                >
                  Add Comment
                </button>
                <button
                  className="col-span-1 p-2 rounded-lg hover:bg-gray-200 mt-2 mx-2"
                  onClick={() => setCommentTextClicked(false)}
                >
                  Cancel
                </button>
              </div>
            ) : null}
          </div>
          <div className="px-4 py-2">
            <h2 className="font-bold text-xl text-blue-500">Comments</h2>
            <div>
              {patternData.comments.length === 0 ? (
                <div className="bg-gray-100 p-4 my-3 rounded-lg">
                  <p className="text-gray-400">No feedbacks added yet</p>
                </div>
              ) : (
                patternData.comments.map((comment) => (
                  <Comments
                    review={comment}
                    expertId={expertId}
                    isVerified={
                      expertVerificationPhase.includes("NotVerified")
                        ? true
                        : false
                    }
                  />
                ))
              )}
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default withExpertAuth(PatternDetailsComponent);
