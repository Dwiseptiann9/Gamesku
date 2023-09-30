// Untuk scroll menggunakan parameter useRef
const Move = (targetRef) => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
};

export default Move;