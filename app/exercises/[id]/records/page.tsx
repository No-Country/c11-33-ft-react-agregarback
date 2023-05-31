import Label from "../../../../components/exercises/record/label"

export default function Records (){

    return (<div className="z-10 min-w-[330px] m-auto p-3 my-2">
        <div className="min-w-[330px] m-auto p-3 my-2">
            <p className="text-[12px] text-accent-600">PERSONAL RECORDS</p>
            <Label title="Max volume added" description="40lbs"/>
            <Label title="Max reps" description="20"/>
            <Label title="Max weigth added" description="5 lbs"/>
        </div>
        <div className="min-w-[330px] m-auto p-3 my-2">
            <p className="text-[12px] text-accent-600">LIFETIME STATS</p>
            <Label title="Total reps" description="30"/>
            <Label title="Total weigth added" description="40 lbs"/>
            <Label title="Total reps" description="30"/>
            <Label title="Total weigth added" description="40 lbs"/>
        </div>
    </div>)
}