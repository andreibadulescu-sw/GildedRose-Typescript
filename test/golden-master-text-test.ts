import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

// Add a master test here
describe('Gilded Rose Master Tests', function () {

    it('MT 1', function() {
        const gildedRose = new GildedRose([
            new Item('Sulfuras, Hand of Ragnaros', 100, 80),
            new Item('Backstage passes to a TAFKAL80ETC concert', 20, 20),
            new Item('Backstage passes to a TAFKAL80ETC concert', 9, 20),
            new Item('Backstage passes to a TAFKAL80ETC concert', 7, 20),
            new Item('Backstage passes to a TAFKAL80ETC concert', 3, 20),
            new Item('Backstage passes to a TAFKAL80ETC concert', 1, 100),
            new Item('Aged Brie', 1, 45),
            new Item('Aged Brie', 1, 50),
            new Item('Magic Crow', 14, 30),
            new Item('Cow Powder', 0, 25),
            new Item('Atomic Pen', 20, 1),
            new Item('Conjured Tomato', 7, 10),
            new Item('Conjured Ketchup', 1, 10)
        ]);
        
        const items = new GildedRose(gildedRose.updateQuality()).updateQuality();
        
        expect(items).to.equal([
            new Item('Sulfuras, Hand of Ragnaros', 100, 80),
            new Item('Backstage passes to a TAFKAL80ETC concert', 18, 22),
            new Item('Backstage passes to a TAFKAL80ETC concert', 7, 24),
            new Item('Backstage passes to a TAFKAL80ETC concert', 5, 25),
            new Item('Backstage passes to a TAFKAL80ETC concert', 1, 26),
            new Item('Backstage passes to a TAFKAL80ETC concert', 0, 0),
            new Item('Aged Brie', 0, 48),
            new Item('Aged Brie', 0, 50),
            new Item('Magic Crow', 12, 28),
            new Item('Cow Powder', 0, 21),
            new Item('Atomic Pen', 18, 0),
            new Item('Conjured Tomato', 5, 6),
            new Item('Conjured Ketchup', 0, 4)
        ]);
    });
    
});