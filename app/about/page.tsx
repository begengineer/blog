export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">About</h1>

        <div className="prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">このブログについて</h2>
            <p className="text-gray-700 mb-4">
              日常の学びや経験を共有するための技術ブログです。
            </p>
            <p className="text-gray-700">
              日々の開発で得た知見や、新しく学んだ技術について記事を書いています。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">主なトピック</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>組み込みシステム関連</li>
              <li>C/C++</li>
              <li>MATLAB/Simulink</li>
              <li>その他の技術トピック</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
