import { useParams } from "react-router-dom";
import { useGetWorkId } from "../../hooks/useGetWorkId";
import { useEffect } from "react";
import Loading from "../UI/Loading";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import GistEmbed, { extractGistIdFromEmbed } from "./GistEmbed";

function DetailWork() {
  const { subjectId, id } = useParams<{ subjectId?: string; id?: string }>();
  const { getWorkId, workData, loading } = useGetWorkId();

  useEffect(() => {
    getWorkId(subjectId, id);
  }, [subjectId, id]);

  const gistId = workData?.linkCode
    ? extractGistIdFromEmbed(workData.linkCode)
    : "";
  return (
    <div className="min-h-screen w-full px-6 py-8 lg:px-12 lg:py-12  transition-colors duration-500">
      {loading ? (
        // Loading Spinner Centered
        <div className="flex justify-center items-center h-[70vh]">
          <div className="relative">
            <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-pulse"></div>
            <Loading />
          </div>
        </div>
      ) : (
        <div className="min-w-[350px] max-w-7xl mx-auto">
          {/* Hero Header */}
          <header className="mb-16 text-center relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
            <h1 className="text-xl sm:text-3xl font-extrabold   leading-tight tracking-tight pt-8">
              {workData?.title || "ไม่มีหัวข้อ"}
            </h1>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
          </header>

          {/* Main Content Grid */}
          <main className="grid grid-cols-1 xl:grid-cols-12 gap-12 mb-16">
            {/* Left Content */}
            <section className="xl:col-span-8 space-y-12">
              {/* Detail Section */}
              <article className="group">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl border-2 border-blue-200 flex items-center justify-center group-hover:border-blue-400 transition-colors duration-300">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 8a1 1 0 011-1h4a1 1 0 011 1v4H7v-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold group-hover:text-blue-600 transition-colors duration-300">
                    รายละเอียด
                  </h2>
                </div>
                <p className="pl-16 text-sm leading-relaxed">
                  {workData?.description || "ไม่มีรายละเอียด"}
                </p>
              </article>

              {/* Source Code Section */}
              {gistId && (
                <article className="group">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12   flex items-center justify-center group-hover:border-purple-400 transition-colors duration-300">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold   group-hover:text-purple-600 transition-colors duration-300">
                      Source Code
                    </h2>
                  </div>
                  <div className=" bg-white p-6 rounded-md  transition-colors duration-300 ">
                    <GistEmbed gistId={gistId} />
                  </div>
                </article>
              )}
            </section>

            {/* Right Sidebar */}
            <aside className="xl:col-span-4">
              <div className="sticky top-8 space-y-8">
                {/* Project Link Card */}
                <div className="group p-8 border-2 border-gray-200 dark:border-gray-700 rounded-3xl hover:border-blue-300 transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-10 h-10 rounded-xl border-2 border-green-200 flex items-center justify-center group-hover:border-green-400 transition-colors duration-300">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h5 className="text-2xl text-white font-bold">
                      ลิงก์งาน
                    </h5>
                  </div>

                  {workData?.link ? (
                    <a
                      href={workData.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-3 w-full px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl"
                    >
                      <span>ไปยังลิงก์งาน</span>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  ) : (
                    <div className="flex items-center justify-center space-x-3 w-full px-6 py-4 text-lg text-gray-400 border-2 border-dashed border-gray-300 rounded-2xl">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>ไม่มีลิงก์</span>
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl text-center hover:border-orange-300 transition-colors duration-300 bg-white dark:bg-gray-800">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {workData?.images?.length || 0}
                    </div>
                    <div className="text-sm text-white font-medium">
                      รูปภาพ
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl text-center transition-colors duration-300 bg-white dark:bg-gray-800">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {gistId ? "1" : "0"}
                    </div>
                    <div className="text-sm text-white font-medium">
                      Source Code
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </main>

          {/* Images Gallery */}
          <section className="mb-16">
            <div className="flex items-center space-x-4 mb-12">
              <div className="w-12 h-12 rounded-2xl border-2 border-pink-300 flex items-center justify-center hover:border-pink-500 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-pink-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10zM9 9a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold">
                รูปภาพตัวอย่าง <span className="text-sm">(คลิกรูปเพื่อดูภาพ)</span>
              </h2>
            </div>

            {workData?.images?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {workData.images.map((image, index :number) => (
                  <Zoom key={index}>
                    <img
                      src={image.url}
                      alt={`Image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-3xl transition-colors duration-300 cursor-pointer"
                      loading="lazy"
                    />
                  </Zoom>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 italic">
                ไม่มีรูปภาพตัวอย่าง
              </p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default DetailWork;
