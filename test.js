class Post {
  // properties
  title = "DEFAULT";
  imageUrl;
  creatorId;

  constructor(newTitle) {
    this.title = newTitle;
  }
}

class ImagePost extends Post {
  constructor(title) {
    super(title);
  }
  imageUrl;
  imageDescription;
}

class VideoPost extends Post {
  videoUrl;
  rating;
}

console.log(new ImagePost("Longing for Pineapples"));
