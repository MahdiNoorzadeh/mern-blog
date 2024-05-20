export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7">درباره سایت خبری مهدی</h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
          <p>
              پروژه پایانی دانشگاه من با عنوان "سایت خبری مهدی" با استفاده از تکنولوژی 
              <span className="english-text"> MERN (MongoDB, Express, React, Node.js) </span>
              طراحی و پیاده‌سازی شده است. هدف اصلی این پروژه ایجاد یک پلتفرم خبری مدرن و کارآمد است که بتواند نیازهای مقالات شخصی و خبرگزاری‌های کوچک و در حال رشد را برآورده سازد.
            </p>

            <p>
              این پروژه به صورت آزاد در گیت هاب قابل دسترسی میباشد و میتوانید بهبود های مدنظرتون رو اونجا مطرح کنید 
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
