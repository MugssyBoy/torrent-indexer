const test = require("ava");
const Torrentproject = require("./torrentproject");
const { sources } = require("../config");
const { expect } = require("chai");

const torrentproject = new Torrentproject(sources.torrentproject);

test("should work properly", async () => {
  const { url } = sources.torrentproject;
  const results = await torrentproject.search("rick and morty s04e01");
  expect(results).to.be.an("array");
  expect(results.length).to.be.at.least(5);

  for (const item of results) {
    expect(item.title.toLowerCase()).to.be.equal("rick and morty");
    expect(item.fileName).to.be.an("string");
    expect(item.fileName.length).to.be.at.least(10);

    expect(item.seeders).to.be.an("number");
    expect(item.seeders).to.be.least(0);

    expect(item.leechers).to.be.an("number");
    expect(item.leechers).to.be.least(0);

    expect(item.uploaded).to.be.an("string");
    expect(item.uploaded.length).to.be.at.least(6);

    expect(item.size).to.be.an("string");
    expect(item.size).to.include("B");

    expect(item.length).to.be.an("number");
    expect(item.length).to.be.least(1024);

    expect(item.link).to.be.an("string");
    expect(item.link).to.include(url);
  }
});
