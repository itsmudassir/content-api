import { TagCloud } from "react-tagcloud";

const TopKeyWords = (props) => {
  const { data } = props;

  const data1 = [
    { value: "JavaScript", count: 38 },
    { value: "React", count: 30 },
    { value: "Nodejs", count: 28 },
    { value: "Express.js", count: 25 },
    { value: "HTML5", count: 33 },
    { value: "MongoDB", count: 18 },
    { value: "CSS3", count: 20 },
  ];

  const valuesArray = data?.buckets.map((item) => {
    return {
      value: item.key,
      count: item.doc_count,
      props: { title: "Keyword total count: " + item.doc_count},
    };
  });

  return (
    <>
      <h4 className="pl-2 mb-3 text-lg font-semibold">Top Keywords</h4>

      <TagCloud
        minSize={12}
        maxSize={35}
        tags={valuesArray}
        shuffle={true}
        colorOptions={{
            luminosity: 'dark',
          }}
      />
    </>
  );
};

export default TopKeyWords;
