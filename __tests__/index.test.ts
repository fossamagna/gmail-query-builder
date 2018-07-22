import QueryBuilder, { Unit } from '../src/index';

const $q = QueryBuilder.q;

describe('QueryBuilder', () => {
  describe('from', () => {
    it('should be built from:value filter string.', () => {
      const query = $q().from('fossamagna').build();
      expect(query).toBe('from:fossamagna');
    });
  });

  describe('to', () => {
    it('should be built to:value filter string.', () => {
      const query = $q().to('fossamagna').build();
      expect(query).toBe('to:fossamagna');
    });
  });

  describe('subject', () => {
    it('should be built subject:dinner filter string.', () => {
      const query = $q().subject('dinner').build();
      expect(query).toBe('subject:dinner');
    });
  });

  describe('or', () => {
    it('should be built {fossamagna MURAKAMI} filter string.', () => {
      const query = $q().or('fossamagna', 'MURAKAMI').build();
      expect(query).toBe('{fossamagna MURAKAMI}');
    });
  });

  describe('exclude', () => {
    it('should be built \'dinner -movie\' filter string.', () => {
      const query = $q('dinner').exclude('movie').build();
      expect(query).toBe('dinner -movie');
    });
  });

  describe('around', () => {
    it('should be built \'dinner AROUND 5 friday\' filter string.', () => {
      const query = $q('dinner').around(5, 'friday').build();
      expect(query).toBe('dinner AROUND 5 friday');
    });
  });

  describe('label', () => {
    it('should be built \'label:friends\' filter string.', () => {
      const query = $q().label('friends').build();
      expect(query).toBe('label:friends');
    });
  });

  describe('hasAttachement', () => {
    it('should be built \'has:attachment\' filter string.', () => {
      const query = $q().hasAttachment().build();
      expect(query).toBe('has:attachment');
    });
  });

  describe('list', () => {
    it('should be built \'list:info@example.com\' filter string.', () => {
      const query = $q().list('info@example.com').build();
      expect(query).toBe('list:info@example.com');
    });
  });

  describe('filename', () => {
    it('should be built \'filename:homework.txt\' filter string.', () => {
      const query = $q().filename('homework.txt').toString();
      expect(query).toBe('filename:homework.txt');
    });
  });

  describe('exact', () => {
    it('should be built "dinner and movie tonight" filter string.', () => {
      const query = $q().exact('dinner and movie tonight').toString();
      expect(query).toBe('"dinner and movie tonight"');
    });
  });

  describe('group', () => {
    it('should be built \'subject:(dinner movie)\' filter string.', () => {
      const query = $q().subject($q().group('dinner', 'movie')).toString();
      expect(query).toBe('subject:(dinner movie)');
    });
  });

  describe('inAnywhere', () => {
    it('should be built \'in:anywhere\' filter string.', () => {
      const query = $q().inAnywhere().toString();
      expect(query).toBe('in:anywhere');
    });
  });

  describe('isImportant', () => {
    it('should be built \'is:important\' filter string.', () => {
      const query = $q().isImportant().toString();
      expect(query).toBe('is:important');
    });
  });

  describe('isStarred', () => {
    it('should be built \'is:starred\' filter string.', () => {
      const query = $q().isStarred().toString();
      expect(query).toBe('is:starred');
    });
  });

  describe('isSnoozed', () => {
    it('should be built \'is:snoozed\' filter string.', () => {
      const query = $q().isSnoozed().toString();
      expect(query).toBe('is:snoozed');
    });
  });

  describe('isUnread', () => {
    it('should be built \'is:unread\' filter string.', () => {
      const query = $q().isUnread().toString();
      expect(query).toBe('is:unread');
    });
  });

  describe('isRead', () => {
    it('should be built \'is:read\' filter string.', () => {
      const query = $q().isRead().toString();
      expect(query).toBe('is:read');
    });
  });

  describe('cc', () => {
    it('should be built cc:value filter string.', () => {
      const query = $q().cc('fossamagna').build();
      expect(query).toBe('cc:fossamagna');
    });
  });

  describe('bcc', () => {
    it('should be built bcc:value filter string.', () => {
      const query = $q().bcc('fossamagna').build();
      expect(query).toBe('bcc:fossamagna');
    });
  });

  describe('after', () => {
    it('should be built after:2004/04/16 filter string.', () => {
      const query = $q().after(new Date(2004, 3, 16, 12, 23, 45)).build();
      expect(query).toBe('after:2004/04/16');
    });
  });

  describe('before', () => {
    it('should be built before:2004/04/18 filter string.', () => {
      const query = $q().before(new Date(2004, 3, 18, 12, 23, 45)).build();
      expect(query).toBe('before:2004/04/18');
    });
  });

  describe('olderThan', () => {
    it('should be built older_than:2d filter string.', () => {
      const query = $q().olderThan(2, Unit.Day).build();
      expect(query).toBe('older_than:2d');
    });

    it('should be built older_than:3m filter string.', () => {
      const query = $q().olderThan(3, Unit.Month).build();
      expect(query).toBe('older_than:3m');
    });

    it('should be built older_than:1y filter string.', () => {
      const query = $q().olderThan(1, Unit.Year).build();
      expect(query).toBe('older_than:1y');
    });
  });

  describe('newerThan', () => {
    it('should be built newer_than:2d filter string.', () => {
      const query = $q().newerThan(2, Unit.Day).build();
      expect(query).toBe('newer_than:2d');
    });

    it('should be built newer_than:3m filter string.', () => {
      const query = $q().newerThan(3, Unit.Month).build();
      expect(query).toBe('newer_than:3m');
    });

    it('should be built newer_than:1y filter string.', () => {
      const query = $q().newerThan(1, Unit.Year).build();
      expect(query).toBe('newer_than:1y');
    });
  });

  describe('isChat', () => {
    it('should be built \'is:chat\' filter string.', () => {
      const query = $q().isChat().toString();
      expect(query).toBe('is:chat');
    });
  });

  describe('deliveredto', () => {
    it('should be built \`deliveredto:username@gmail.com\` filter string.', () => {
      const query = $q().deliveredto('username@gmail.com').build();
      expect(query).toBe('deliveredto:username@gmail.com');
    });
  });

  describe('category', () => {
    it('should be built \`category:updates\` filter string.', () => {
      const query = $q().category('updates').build();
      expect(query).toBe('category:updates');
    });
  });
  
  describe('size', () => {
    it('should be built \`size:1000000\` filter string.', () => {
      const query = $q().size(1000000).build();
      expect(query).toBe('size:1000000');
    });
  });

  describe('larger', () => {
    it('should be built \`larger:10M\` filter string.', () => {
      const query = $q().larger('10M').build();
      expect(query).toBe('larger:10M');
    });
  });

  describe('smaller', () => {
    it('should be built \`smaller:10M\` filter string.', () => {
      const query = $q().smaller('10M').build();
      expect(query).toBe('smaller:10M');
    });
  });

  describe('messageId', () => {
    it('should be built \`rfc822msgid:200503292@example.com\` filter string.', () => {
      const query = $q().messageId('200503292@example.com').build();
      expect(query).toBe('rfc822msgid:200503292@example.com');
    });
  });

  describe('hasUserlabels', () => {
    it('should be built \'has:userlabels\' filter string.', () => {
      const query = $q().hasUserlabels().toString();
      expect(query).toBe('has:userlabels');
    });
  });

  describe('hasNouserlabels', () => {
    it('should be built \'has:nouserlabels\' filter string.', () => {
      const query = $q().hasNouserlabels().toString();
      expect(query).toBe('has:nouserlabels');
    });
  });
});
