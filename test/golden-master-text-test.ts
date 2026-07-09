import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

// Add a master test here
describe('Gilded Rose Master Tests', function () {

    it('MT 1', function() {
        const gildedRose = new GildedRose([
            new Item('Sulfuras, Hand of Ragnaros', 100, 80),
            new Item('Backstage passes to a TAFKAL80ETC concert', 3, 20),
            new Item('Backstage passes to a TAFKAL80ETC concert', 1, 100),
            new Item('Aged Brie', 1, 45),
            new Item('Magic Crow', 14, 30),
            new Item('Cow Powder', 0, 25),
            new Item('Conjured Tomato', 7, 10)
        ]);
        
        const items = new GildedRose(gildedRose.updateQuality()).updateQuality();
        
        expect(items).to.equal([
            new Item('Sulfuras, Hand of Ragnaros', 100, 80),
            new Item('Backstage passes to a TAFKAL80ETC concert', 1, 26),
            new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0),
            new Item('Aged Brie', -1, 47),
            new Item('Magic Crow', 12, 28),
            new Item('Cow Powder', -2, 23),
            new Item('Conjured Tomato', 5, 6)
        ]);
    });
    
});