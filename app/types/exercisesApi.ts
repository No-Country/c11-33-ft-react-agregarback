export interface Exercises {
    bodyPart:  BodyPart;
    equipment: Equipment;
    gifUrl:    string;
    id:        string;
    name:      string;
    target:    Target;
}

export enum BodyPart {
    Back = "back",
    Cardio = "cardio",
    Chest = "chest",
    LowerArms = "lower arms",
    LowerLegs = "lower legs",
    Neck = "neck",
    Shoulders = "shoulders",
    UpperArms = "upper arms",
    UpperLegs = "upper legs",
    Waist = "waist",
}

export enum Equipment {
    Assisted = "assisted",
    Band = "band",
    Barbell = "barbell",
    BodyWeight = "body weight",
    BosuBall = "bosu ball",
    Cable = "cable",
    Dumbbell = "dumbbell",
    EllipticalMachine = "elliptical machine",
    EzBarbell = "ez barbell",
    Hammer = "hammer",
    Kettlebell = "kettlebell",
    LeverageMachine = "leverage machine",
    MedicineBall = "medicine ball",
    OlympicBarbell = "olympic barbell",
    ResistanceBand = "resistance band",
    Roller = "roller",
    Rope = "rope",
    SkiergMachine = "skierg machine",
    SledMachine = "sled machine",
    SmithMachine = "smith machine",
    StabilityBall = "stability ball",
    StationaryBike = "stationary bike",
    StepmillMachine = "stepmill machine",
    Tire = "tire",
    TrapBar = "trap bar",
    UpperBodyErgometer = "upper body ergometer",
    Weighted = "weighted",
    WheelRoller = "wheel roller",
}

export enum Target {
    Abductors = "abductors",
    Abs = "abs",
    Adductors = "adductors",
    Biceps = "biceps",
    Calves = "calves",
    CardiovascularSystem = "cardiovascular system",
    Delts = "delts",
    Forearms = "forearms",
    Glutes = "glutes",
    Hamstrings = "hamstrings",
    Lats = "lats",
    LevatorScapulae = "levator scapulae",
    Pectorals = "pectorals",
    Quads = "quads",
    SerratusAnterior = "serratus anterior",
    Spine = "spine",
    Traps = "traps",
    Triceps = "triceps",
    UpperBack = "upper back",
}
