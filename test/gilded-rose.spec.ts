import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('name foo does not change', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
    });

    it('quality / sell-in decrease for non-expired items', function() {
        const gildedRose = new GildedRose([ new Item('foo', 10, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(9);
        expect(items[0].sellIn).to.equal(9);
    });

    it('quality 2x decrease / sell-in stuck for expired items', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(8);
        expect(items[0].sellIn).to.equal(0);
    });

    it('quality minimum (0) respected', function() {
        const gildedRose = new GildedRose([ new Item('foo', 20, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(19);
        expect(items[0].quality).to.equal(0);
    });

    it('conjured non-expired quality decrease', function() {
        const gildedRose = new GildedRose([ new Item('Conjured foo', 10, 20) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(9);
        expect(items[0].quality).to.equal(18);
    });

    it('conjured expired quality 2x decrease', function() {
        const gildedRose = new GildedRose([ new Item('Conjured foo', 0, 20) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(16);
    });
    

    it('Aged Brie non-expired quality increase', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 10, 20) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(9);
        expect(items[0].quality).to.equal(21);
    });

    it('Aged Brie expired quality 2x increase', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 0, 20) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(22);
    });

    it('quality maximum (50) respected', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 20, 50) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(19);
        expect(items[0].quality).to.equal(50);
    });

    it('locking of Sulfuras stats', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 20, 80) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(20);
        expect(items[0].quality).to.equal(80);
    });

    it('Backstage Passes normal quality increase (>10 days)', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 20, 20) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(19);
        expect(items[0].quality).to.equal(21);
    });

    it('Backstage Passes +2 quality increase (6..10 days)', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 7, 20) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(6);
        expect(items[0].quality).to.equal(22);
    });

    it('Backstage Passes +3 quality increase (1..5 days)', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 4, 20) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(3);
        expect(items[0].quality).to.equal(23);
    });

    it('Backstage Passes expired', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(0);
    });

});
