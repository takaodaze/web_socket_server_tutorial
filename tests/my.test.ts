import path from "path";

describe("my.test", () => {
    test("should first", () => {
        expect("hoge").toEqual("hoge");
        const a = path.join(__dirname, "public");
        console.log(a);
    });
});
